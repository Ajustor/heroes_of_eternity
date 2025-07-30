import type { Socket } from 'socket.io'

export async function linkgFightSystem(socket: Socket) {

  function send(socket: Socket, event: string, data: any) {
    socket.to(socket.data.roomId).emit(event, data)
  }

  function getAllPlayers(room: string) {
    return getConnectedSockets().reduce((acc, socket) => {
      const player = socket.roomId == room && socket.player ? socket : null
      if (player) {
        acc.push(player)
      }
      return acc
    }, [])
  }

  function getUsernames(room: string) {
    return getConnectedSockets().reduce((acc, socket) => {
      const username = socket.roomId == room && socket.player ? socket.player.username : null
      if (username) {
        acc.push(username)
      }
      return acc
    }, [])
  }

  function getOneByUsername(room: string, username: string) {
    return getConnectedSockets().find((socket, i) => {
      return socket.roomId === room && socket.player && socket.player.username === username
    })
  }

  function getOneByPlayerId(room: string, playerId: number) {
    return getConnectedSockets().find((socket, i) => {
      return socket.roomId === room && socket.player && socket.playerId === playerId
    })
  }

  function getConnectedSockets() {
    return Array.from(io.sockets.sockets, ([name, value]) => ({
      id: name,
      ...value,
    }))
  }

  socket.on('sendId', () => {
    const id = socket.data.playerId++ % 4
    socket.to(socket.data.roomId).emit('id', id)
    socket.emit('id', id)
  })

  socket.on('id', (id) => {
    socket.data.playerId = id
  })

  socket.on('connected', (data) => {
    socket.data.roomId = data.roomId
    socket.join(socket.data.roomId)
    socket.to(socket.data.roomId).emit('connected')
  })

  socket.on('controller', (pseudo) => {
    socket.data.player = new Player({
      username: pseudo,
      intel: randomInt(10, 50),
      strength: randomInt(10, 50),
      agility: randomInt(10, 50),
    })
    socket.emit('player', socket.data.player)
    socket.emit('isConnected', getUsernames(socket.data.roomId))
    socket.to(socket.data.roomId).emit('isConnected', pseudo)
  })

  socket.on('forcedLaunch', () => {
    send(socket, 'forcedLaunch')
  })

  socket.on('notController', (pseudo) => {
    socket.boss = new Player({
      username: 'Boss',
      intel: randomInt(10, 100),
      strength: randomInt(10, 100),
      agility: randomInt(10, 100),
    })
    socket.emit('player', socket.boss)
  })

  socket.on('attack', () => {
    socket.data.action = 'attack'
    socket.to(socket.data.roomId).emit('wantToAttack', { player: socket.data.player, id: socket.data.playerId })
  })

  socket.on('update', (player) => {
    socket.data.player.life = player.life
    socket.data.player.mana = player.mana
  })

  socket.on('launch', () => {
    socket.to(socket.data.roomId).emit('launch')
  })

  socket.on('win', () => {
    socket.to(socket.data.roomId).emit('win')
    socket.emit('win')
  })

  socket.on('guard', () => {
    socket.data.action = 'guard'
    socket.to(socket.data.roomId).emit('wantToGuard', { player: socket.data.player, id: socket.data.playerId })
  })

  socket.on('heal', (who) => {
    socket.data.action = 'heal'
    socket.data.who = who
    socket.to(socket.data.roomId).emit('wantToHeal', { player: socket.data.player, id: socket.data.playerId })
  })

  socket.on('comp', (id) => {
    socket.data.action = 'comp'
    socket.data.compId = id
    socket.to(socket.data.roomId).emit('wantToUse', {
      player: socket.data.player,
      id: socket.data.playerId,
      compId: id,
    })
  })

  socket.on('low', (id) => {
    socket.to(socket.data.roomId).emit('low', socket.data.playerId)
  })

  socket.on('unlow', (id) => {
    socket.to(socket.data.roomId).emit('unlow', socket.data.playerId)
  })

  socket.on('dead', (id) => {
    socket.data.player.life = 0
    send(socket, 'dead', socket.data.playerId)
    socket.emit('dead', socket.data.playerId)
  })

  socket.on('doTurn', async () => {
    let muchDamage = 0
    const players = getAllPlayers(socket.data.roomId)
    for (const { action, ...player } of players) {
      const damage = this[action](socket, player)
      muchDamage = muchDamage > damage ? muchDamage : damage
      if (muchDamage === damage) {
        socket.data.muchDamageId = player.playerId
      }
      await wait(2)
    }
    // Boss logic
    if (
      socket.data.muchDamageId != null &&
      socket.data.boss.life > 0 &&
      ((socket.data.boss.mana < 10 && socket.data.boss.life > (25 / 100) * socket.data.boss.maxLife) ||
        randomInt(0, 100) > 10)
    ) {
      const user = getOneByPlayerId(socket.data.roomId, socket.data.muchDamageId)
      if (
        randomInt(0, 1000) > 800 &&
        socket.data.boss.mana > 100 &&
        socket.data.boss.life < (socket.data.boss.maxLife * 30) / 100
      ) {
        socket.data.boss.mana -= 100
        const damage = socket.data.boss.getMagicDamage()
        socket.to(socket.data.roomId).emit('magicHurt', damage)
        socket.emit('magicHurt')
      } else if (socket.data.boss.agility + randomInt(0, 100) < user.player.agility) {
        socket.emit('evade', { id: socket.data.muchDamageId })
      } else {
        const damage = socket.data.boss.getDamage() - (user.action === 'guard' ? randomInt(1, 5) : 0)
        user.player.life -= damage
        socket.to(socket.data.roomId).emit('hurt', {
          id: socket.data.muchDamageId,
          damage: damage,
          username: user.player.username,
        })
        socket.emit('hurt', {
          id: socket.data.muchDamageId,
          damage: damage,
          username: user.player.username,
        })
      }

      if (user.player.life <= 0) {
        socket.data.muchDamageId = null
        socket.to(socket.data.roomId).emit('dead', socket.data.muchDamageId)
        socket.emit('dead', socket.data.muchDamageId)
      }
    } else if (socket.data.muchDamageId != null && socket.data.boss.life > 0) {
      socket.data.boss.life += socket.data.boss.getHeal()
      socket.data.boss.mana -= 10
      if (socket.data.boss.life > socket.data.boss.maxLife) socket.data.boss.life = socket.data.boss.maxLife
      socket.emit('healBoss', socket.data.boss)
    }

    for (const player of players) {
      player.action = null
      player.who = null
      if (player.player.life <= 0) {
        socket.to(socket.data.roomId).emit('dead', socket.data.muchDamageId)
        socket.emit('dead', socket.data.muchDamageId)
      }
    }

    socket.to(socket.data.roomId).emit('endTurn')
    socket.emit('endTurn')
  })

  socket.on('loose', () => {
    send(socket, 'loose')
    socket.emit('loose')
  })

  socket.on('needHeal', () => {
    send(socket, 'needHeal', socket.data.playerId)
  })

  socket.on('disconnect', () => {
    send(socket, 'disconnected', {
      id: socket.data.playerId,
      username: socket.data.player ? socket.data.player.username : null,
    })
    socket.leave(socket.data.roomId)
  })
}