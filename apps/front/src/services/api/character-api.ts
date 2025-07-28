import type { Cookies } from '@sveltejs/kit'
import { client } from './client'

export async function createCharacter(name: string, cookies: Cookies) {
    const { error } = await client.characters.post({ name }, {
        headers: {
            authorization: `Bearer ${cookies.get(('auth'))}`
        }
    })

    if (error) {
        console.error(error)
        throw error
    }
}

export async function listCharacters() {
    const { data: characters, error } = await client.characters.get({ query: {} })

    if (error) {
        console.error(error)
        throw error
    }

    return characters
}


export async function listMyCharacters(cookies: Cookies, userId: string) {
    const { data: characters, error } = await client.characters.get({
        headers: {
            authorization: `Bearer ${cookies.get(('auth'))}`
        },
        query: {
            userId
        }
    })

    if (error) {
        console.error(error)
        throw error
    }

    return characters
}

export async function getCharacter(cookies: Cookies, characterId: string) {
    const { data: character, error } = await client.characters({ characterId }).get({
        headers: {
            authorization: `Bearer ${cookies.get(('auth'))}`
        },
    })

    if (error) {
        console.error(error)
        throw error
    }

    return character
}

// export async function updateCharacter(cookies: Cookies, characterId: string, name: string) {
//     const { error } = await client.characters({ characterId }).put({ name }, {
//         headers: {
//             authorization: `Bearer ${cookies.get(('auth'))}`
//         },
//     })

//     if (error) {
//         console.error(error)
//         throw error
//     }
// }