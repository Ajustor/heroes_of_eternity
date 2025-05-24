
import { fail, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type { Actions, PageServerLoad } from "./$types"
import { newCharacterSchema } from "$lib/schemas/character"
import { listMyCharacters, createCharacter } from "../../services/api/character-api"

export const load: PageServerLoad = async ({ cookies }) => {
    return {
        newCharacterForm: await superValidate(zod(newCharacterSchema)),
        myCharacters: await listMyCharacters(cookies)
    }
}

export const actions: Actions = {
    newCharacter: async ({ cookies, url, ...event }) => {
        const form = await superValidate({ cookies, url, ...event }, zod(newCharacterSchema))
        if (!form.valid) {
            return fail(400, {
                form,
            })
        }
        await createCharacter(form.data.name, cookies)
    }
}