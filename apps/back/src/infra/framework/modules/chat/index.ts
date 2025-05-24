import { Elysia, t } from "elysia"
import { authorization } from '../../../../libs/handlers/authorization'
import { validateUser } from "@/libs/jwt"

export type ChatMessage = { username: string, id: string, message: string }


export const chatModule = new Elysia({ prefix: 'chat' })
    .use(authorization('You need to be connected to chat'))
    .ws('', {
        body: t.Object({
            message: t.String(),
            accessToken: t.Optional(t.String())
        }),
        response: t.Object({
            username: t.String(),
            message: t.String(),
            token: t.Optional(t.String())
        }),
        open(ws) {
            if (!ws.data.user) {
                ws.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
            }
        },
        message(ws, body) {

            if (body.accessToken) {
                const user = validateUser(body.accessToken)
                if (!user) {
                    ws.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
                    return
                }

                ws.data = { ...ws.data, user }
            }

            if (!ws.data.user && !body.accessToken) {
                ws.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
                return
            }

            ws.publish('global', { message: body.message, username: ws.data.user.username })
            ws.send({ message: body.message, username: ws.data.user.username })
        }
    })