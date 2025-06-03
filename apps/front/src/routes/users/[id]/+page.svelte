<script lang="ts">
	import { passwordChangeSchema } from '$lib/schemas/passwordChanger'
	import { toast } from 'svelte-sonner'
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { userStore } from '../../../stores/user'

	let { data } = $props()

	const user = userStore()

	if (data.user) {
		user.value = data.user
	}

	const form = superForm(data.passwordChangeForm, {
		validators: zodClient(passwordChangeSchema),
		onError({ result }) {
			if (result.error) {
				toast.error(result.error.message)
			}
		}
	})

	const { form: formData, enhance, errors, constraints, message: messageStore } = form
</script>

<div class="m-auto flex h-full w-3/4 flex-col items-center justify-center">
	<h1 class="text-5xl">Bonsoir {data.user.username}</h1>

	<form method="POST" use:enhance>
		<div class="flex flex-col gap-3">
			<label for="old-password">Mot de passe actuel</label>
			<input
				type="password"
				name="oldPassword"
				id="old-password"
				class="input validator"
				required
				bind:value={$formData.oldPassword}
				{...$constraints.oldPassword}
			/>
		</div>
		<div class="flex flex-col gap-3">
			<label for="new-password">Nouveau mot de passe actuel</label>
			<input
				type="password"
				name="newPassword"
				id="new-password"
				class="input validator"
				required
				bind:value={$formData.newPassword}
				{...$constraints.newPassword}
			/>
		</div>
		<div class="flex flex-col gap-3">
			<label for="new-password-verif">Nouveau mot de passe</label>
			<input
				type="password"
				name="newPasswordVerif"
				id="new-password-verif"
				class="input validator"
				required
				bind:value={$formData.passwordVerif}
				{...$constraints.passwordVerif}
			/>
		</div>
		<button class="btn">Enregistrer</button>
	</form>
</div>
