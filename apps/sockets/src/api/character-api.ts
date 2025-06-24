import { client } from "./client"

export async function getCharacter(token: string, characterId: string) {
    const { data: character, error } = await client.characters({ characterId }).get({
        headers: {
            authorization: `Bearer ${token}`
        },
    })

    if (error) {
        console.error(error)
        throw error
    }

    return character
}