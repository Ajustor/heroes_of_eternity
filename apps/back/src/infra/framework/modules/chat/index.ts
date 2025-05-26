import { Elysia, t } from "elysia"
import { validateUser } from "@/libs/jwt"
import bearer from "@elysiajs/bearer"

export type ChatMessage = { username: string, id: string, message: string }


export const chatModule = new Elysia({ prefix: 'chat' })
    .use(bearer())
    .derive({ as: 'scoped', }, async ({ cookie: { auth }, bearer }) => {
        const token = auth.value ?? bearer
        const user = validateUser(token)


        return { user }
    })
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

            const { user } = ws.data

            if (!user || (!body.accessToken && !user)) {
                ws.send({ message: 'NOT_AUTHENTICATED', username: 'Server' })
                return
            }

            ws.publish('global', { message: body.message, username: user.username })
            ws.send({ message: body.message, username: user.username })
        }
    })