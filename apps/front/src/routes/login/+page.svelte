<script lang="ts">
	import { loginSchema } from '$lib/schemas/login'
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'

	import { redirect } from '@sveltejs/kit'
	import { toast } from 'svelte-sonner'
	import { newUserSchema } from '@/schemas/newUser.js'

	let { data } = $props()

	function showFormMessage(message: { status: 'error' | 'success'; text: string }) {
		if (!message) {
			return
		}

		if (message.status === 'error') {
			toast.error(message.text, { class: 'border-red-600' })
			return
		}

		if (message.status === 'success') {
			toast.success(message.text)
			selectedTab = 'login'
			return
		}

		toast.info(message.text)
	}

	const loginForm = superForm(data.loginForm, {
		validators: zodClient(loginSchema),
		onUpdated({ form: { message } }) {
			showFormMessage(message)
		}
	})

	const registerForm = superForm(data.newUserForm, {
		validators: zodClient(newUserSchema),
		onUpdated({ form: { message } }) {
			showFormMessage(message)
		}
	})

	const {
		form: registerFormData,
		enhance: registerEnhance,
		errors: registerErrors,
		constraints: registerConstraints
	} = registerForm

	const {
		form: loginFormData,
		enhance: loginEnhance,
		errors,
		constraints: loginConstraints
	} = loginForm

	let email = $state('')
	let selectedTab = $state('login')

	const askANewPassword = async () => {
		if (!email) {
			toast.error("Merci d'entrer une adresse email")
		}
		await fetch('/login', { body: JSON.stringify({ email }), method: 'POST' })
		throw redirect(302, '/login')
	}
</script>

{#snippet forgotDialog()}{/snippet}

<div class="m-auto flex h-full w-3/4 flex-col items-center justify-center">
	<div class="tabs tabs-lift">
		<input
			type="radio"
			value="login"
			bind:group={selectedTab}
			name="tab"
			class="tab"
			aria-label="Connexion"
		/>
		<div class="tab-content bg-base-100 border-base-300 p-6">
			<form method="POST" action="?/login" use:loginEnhance>
				<div class="flex flex-col gap-3">
					<label for="username">Nom d'utilisateur ou email</label>
					<input
						class="input validator"
						required
						type="text"
						id="username"
						name="username"
						bind:value={$loginFormData.username}
						{...$loginConstraints.username}
					/>
				</div>
				<div class="flex flex-col gap-3">
					<label for="password">Mot de passe</label>
					<input
						class="input validator"
						required
						id="password"
						type="password"
						name="password"
						bind:value={$loginFormData.password}
						{...$loginConstraints.password}
					/>
				</div>
				<button class="btn">Se connecter</button>
			</form>
		</div>

		<input
			type="radio"
			name="tab"
			value="register"
			bind:group={selectedTab}
			class="tab"
			aria-label="S'enregistrer"
		/>
		<div class="tab-content bg-base-100 border-base-300 p-6">
			<form action="?/register" method="POST" use:registerEnhance>
				<div class="flex flex-col gap-3">
					<label for="register-username">Nom d'utilisateur</label>
					<input
						type="text"
						name="username"
						id="register-username"
						class="input validator"
						required
						bind:value={$registerFormData.username}
						{...$registerConstraints.username}
					/>
				</div>
				<div class="flex flex-col gap-3">
					<label for="register-email">Email</label>
					<input
						type="email"
						name="email"
						id="register-email"
						class="input validator"
						required
						bind:value={$registerFormData.email}
						{...$registerConstraints.email}
					/>
				</div>
				<div class="flex flex-col gap-3">
					<label for="register-password">Mot de passe</label>
					<input
						type="password"
						name="password"
						id="register-password"
						class="input validator"
						required
						bind:value={$registerFormData.password}
						{...$registerConstraints.password}
					/>
				</div>
				<div class="flex flex-col gap-3">
					<label for="register-password-verif">Vérification du mot de passe</label>
					<input
						type="password"
						name="passwordVerif"
						id="register-password-verif"
						class="input validator"
						required
						bind:value={$registerFormData.passwordVerif}
						{...$registerConstraints.passwordVerif}
					/>
				</div>
				<button class="btn">Enregistrer</button>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	form {
		@apply flex flex-col;
		gap: 2em;
	}
</style>
