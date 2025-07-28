import type { Socket } from "socket.io"
import { getUser } from "../api/user-api"
import { linkTrainingSystem } from './training'

export function linkChatSystem(socket: Socket) {
    socket.on('helloThere', async (body) => {

        if (body.accessToken) {
            const user = await getUser(body.accessToken)
            if (!user) {
                console.info('User is not authenticated start authentication process')
                socket.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
                return
            }

            socket.data = { ...socket.data, user }
            linkTrainingSystem(socket)
        }

        socket.broadcast.emit('message', { message: body.message, username: socket.data.user?.username })
        socket.emit('message', { message: body.message, username: socket.data.user?.username })
    })

    socket.on('message', (body) => {
        if (!socket.data.user) {
            socket.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
            return
        }

        socket.broadcast.emit('message', { message: body.message, username: socket.data.user?.username })
        socket.emit('message', { message: body.message, username: socket.data.user?.username })
    })
}
