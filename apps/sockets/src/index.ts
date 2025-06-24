import { createServer } from "http";
import { Server } from "socket.io";
import { linkChatSystem } from "./services/chat";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: ['https://hoe.darthoit.eu', 'http://localhost:8080'] } });

io.on('connect', (socket) => {
    linkChatSystem(socket)
})

io.on('disconnect', (socket) => {
    console.info('User disconnected')
})

const server = httpServer.listen(process.env.PORT ?? 3000);

console.log('Socket server listening on', server.address())