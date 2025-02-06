import elysiaJWT from '@elysiajs/jwt'
import { User } from '@hoe/db'
import jwt from 'jsonwebtoken'


export const jwtMiddleware = elysiaJWT({
  name: 'jwt',
  secret: process.env.JWT_SECRETS!,
  exp: '7d',
  alg: 'HS256'
})

export function validateUser(token: string): User | null {
  const user = jwt.verify(token, process.env.JWT_SECRETS!, { algorithms: ['HS256'] }) as User

  if (!user) {
    return null
  }

  return user
}