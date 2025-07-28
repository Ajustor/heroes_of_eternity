import { listQuests } from '../services/api/quest-api'
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {

  return {
    quest: await listQuests()
  }
}
