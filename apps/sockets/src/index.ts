import { createServer } from "http";
import { Server } from "socket.io";
import { getUser } from "./api/user-api";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connect', (socket) => {
    socket.on('helloThere', async (body) => {

        if (body.accessToken) {
            const user = await getUser(body.accessToken)
            if (!user) {
                console.info('User is not authenticated start authentication process')
                socket.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
                return
            }

            socket.data = { ...socket.data, user }
        }

        socket.broadcast.emit('message', { message: body.message, username: socket.data.user?.username })
        socket.emit('message', { message: body.message, username: socket.data.user?.username })
    })

    socket.on('message', (body) => {
        socket.broadcast.emit('message', { message: body.message, username: socket.data.user?.username })
        socket.emit('message', { message: body.message, username: socket.data.user?.username })
    })
})

io.on('disconnect', (socket) => {
    console.info('User disconnected')
})

const server = httpServer.listen(process.env.PORT ?? 3000);

console.log('Socket server listening on', server.address())