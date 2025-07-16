import type { Socket } from "socket.io"
import { getCharacter } from "../api/character-api"

export async function linkTrainingSystem(socket: Socket) {
    socket.data.character = await getCharacter(socket.data.user.token, socket.data.user?.id ?? '')
    socket.on('joinTraining', (body) => {
        socket.join(body.trainingId)
    })

    socket.on('leaveTraining', (body) => {
        socket.leave(body.trainingId)
    })
}
