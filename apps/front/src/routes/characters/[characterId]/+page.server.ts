
import { fail, superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"
import type { Actions, PageServerLoad } from "./$types"
import { updateCharacterSchema } from "$lib/schemas/character"
import { getCharacter } from "../../../services/api/character-api"
import { getUser } from '../../../services/api/user-api'

export const load: PageServerLoad = async ({ cookies, params: { characterId } }) => {
  const user = await getUser(cookies)

  return {
    updateCharacterForm: await superValidate(zod(updateCharacterSchema)),
    character: await getCharacter(cookies, characterId)
  }
}

// export const actions: Actions = {
//   updateCharacter: async ({ cookies, url, ...event }) => {
//     const form = await superValidate({ cookies, url, ...event }, zod(updateCharacterSchema))
//     if (!form.valid) {
//       return fail(400, {
//         form,
//       })
//     }
//     await updateCharacter(cookies, form.data)
//   }
// }