import type { PageServerLoad } from "./$types"
import { getQuest } from "../../../services/api/quest-api"

export const load: PageServerLoad = async ({ cookies, params: { id } }) => {

  return {
    quest: await getQuest(cookies, id)
  }
}
