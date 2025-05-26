<script lang="ts">
	import BeastCard from '$lib/components/beasts/Card/Card.svelte'

	let { data } = $props()
</script>

<div class="m-auto flex h-full w-3/4 flex-col items-center justify-center">
	<h1 class="text-5xl">Bestiaire</h1>
	<div class="rounded-box mt-5 flex gap-4">
		{#each data.beasts as beast}
			<BeastCard {beast} />
		{/each}
	</div>
</div>
