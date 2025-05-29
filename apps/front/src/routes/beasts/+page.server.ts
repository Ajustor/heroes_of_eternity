import { listBeasts } from "../../services/api/beast-api"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    return {
        beasts: await listBeasts()
    }
}