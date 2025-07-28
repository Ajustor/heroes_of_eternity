<script lang="ts">
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	let quest: any

	onMount(async () => {
		quest = $page.data.quest
	})
</script>

<main class="container mx-auto px-4 py-8">
	{#if quest}
		<div class="rounded-lg bg-white p-6 shadow-md">
			<h1 class="mb-4 text-3xl font-bold">{quest.name}</h1>
			<div class="mb-6">
				<p class="text-gray-700">{quest.description}</p>
			</div>
			<div class="mb-6">
				<p class="text-gray-700">{quest.steps.length} étapes</p>
			</div>
			<div class="flex flex-col gap-4">
				<h2 class="mb-2 text-xl font-semibold">Récompenses</h2>
				{#each quest.rewards as reward}
					<div class="flex items-center gap-2">
						<input
							type="checkbox"
							class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
							disabled
						/>
						<span class="text-gray-700">{reward.item.name} ({reward.amount})</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</main>

<style>
	main {
		max-width: 800px;
	}
</style>
