<script lang="ts">
	import { superForm } from 'sveltekit-superforms'
	import { zodClient } from 'sveltekit-superforms/adapters'
	import { newCharacterSchema } from '$lib/schemas/character'
	import { toast } from 'svelte-sonner'
	import CharacterCard from '$lib/components/characters/Card/Card.svelte'

	let { data } = $props()

	function showFormMessage(message: { status: 'error' | 'success'; text: string }) {
		if (!message) {
			return
		}

		if (message.status === 'error') {
			toast.error(message.text, { class: 'border-red-600' })
			return
		}

		toast.info(message.text)
	}

	const charactersForm = superForm(data.newCharacterForm, {
		validators: zodClient(newCharacterSchema),
		onUpdated({ form: { message } }) {
			showFormMessage(message)
		}
	})

	const {
		form: charactersFormData,
		enhance: charactersEnhance,
		errors,
		constraints: charactersConstraints
	} = charactersForm

	let createCharacterModal = $state<HTMLDialogElement | null>(null)
</script>

{#snippet createCharacterForm()}
	<button class="btn" onclick={() => createCharacterModal?.showModal()}>Créer un personnage</button>
	<dialog bind:this={createCharacterModal} class="modal">
		<div class="modal-box">
			<form method="POST" action="?/newCharacter" use:charactersEnhance>
				<div class="flex flex-col gap-3">
					<label for="name">Nom</label>
					<input
						class="input validator"
						required
						type="text"
						id="name"
						name="name"
						bind:value={$charactersFormData.name}
						{...$charactersConstraints.name}
					/>
				</div>
				<button class="btn">Créer</button>
			</form>
		</div>
	</dialog>
{/snippet}

<div class="m-auto flex h-full w-3/4 flex-col items-center justify-center">
	<h1>Mes personnages</h1>

	{@render createCharacterForm()}

	{#each data.myCharacters as character}
		<CharacterCard {character} />
	{/each}
</div>
