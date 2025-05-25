import type { PageServerLoad } from './$types'
import type { Actions } from './$types'
import { loginSchema } from '$lib/schemas/login'
import { newUserSchema } from '$lib/schemas/newUser'
import { message, superValidate, fail } from 'sveltekit-superforms'
import { zod } from 'sveltekit-superforms/adapters'
import { redirect } from '@sveltejs/kit'
import { createNewUser, login } from '../../services/api/user-api'

export const load: PageServerLoad = async () => {
  return {
    loginForm: await superValidate(zod(loginSchema)),
    newUserForm: await superValidate(zod(newUserSchema))
  }
}

export const actions: Actions = {
  login: async ({ cookies, url, ...event }) => {
    const form = await superValidate({ cookies, url, ...event }, zod(loginSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      })
    }
    try {
      await login(form.data.username, form.data.password, cookies)
    } catch (error) {
      console.error(error)
      return message(form, { status: 'error', text: 'Aucun utilisateur trouvé pour ces informations de connexion' }, error)
    }

    const redirectTo = url.searchParams.get('redirectTo')
    if (redirectTo) {
      return redirect(302, `/${redirectTo.slice(1)}`)
    }
    return redirect(302, '/')
  },
  register: async ({ cookies, url, ...event }) => {
    const form = await superValidate({ cookies, url, ...event }, zod(newUserSchema))
    if (!form.valid) {
      return fail(400, {
        form,
      })
    }
    await createNewUser(form.data.email, form.data.password, form.data.username).catch(error => {
      return message(form, { status: 'error', text: error.value }, error)
    })

    return message(form, { status: 'success', text: 'Utilisateur créé avec succès' })
  }
}
