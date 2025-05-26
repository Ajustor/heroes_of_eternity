import { client } from './client'


export async function listBeasts() {
    const { data: beasts, error } = await client.beasts.get()
    console.log(beasts)

    if (error) {
        console.error(error)
        throw error
    }

    return beasts
}