import { client } from './client'

export async function getUser(token: string) {
  const { data: user, error } = await client.auth.get({
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  if (error) {
    console.error(error)
    throw error
  }

  return user
}
