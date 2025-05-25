import { useRune } from './sharedStore'

export type User = { username: string, id: string, email: string, token: string }

export const userStore = (defaultUser: User | null = null) => useRune('user', defaultUser)