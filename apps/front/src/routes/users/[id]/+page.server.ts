import type { PageServerLoad, Actions } from './$types'
import type { User } from '../../../stores/user'
import { changePassword, getUser } from "../../../services/api/user-api"
import { superValidate, fail } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { passwordChangeSchema } from '$lib/schemas/passwordChanger'

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('auth')
    const isLogged = !!cookies.get('auth')
    let user: User | null = null
    if (isLogged) {
        try {
            user = { ...(await getUser(cookies)), token }

        } catch (error) {
            console.error(error)
        }
    }

    return {
        user,
        passwordChangeForm: await superValidate(zod(passwordChangeSchema))
    }
}

export const actions: Actions = {
    default: async ({ cookies, url, ...event }) => {
        const form = await superValidate({ cookies, url, ...event }, zod(passwordChangeSchema))
        if (!form.valid) {
            return fail(400, {
                form,
            })
        }

        await changePassword(cookies, form.data.oldPassword, form.data.newPassword).catch((e) => message(form, { status: 'error', text: e.value.message }))
        cookies.delete('auth', { path: '/' })
    }
}