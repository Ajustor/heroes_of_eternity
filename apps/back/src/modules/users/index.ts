import { Elysia } from 'elysia'

export const usersModule = new Elysia({ prefix: 'users' }).get(
  '/',
  () => 'Hello Elysia',
)
