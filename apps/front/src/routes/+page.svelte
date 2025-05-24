<script>
	import { BGM, BGM_KEYS, BACKGROUNDS, BACKGROUNDS_KEYS } from '@hoe/assets'
	import { Assets } from '$lib'

	const bgmPath = BGM.get(BGM_KEYS.Battle) ?? ''
	const backgroundPath = BACKGROUNDS.get(BACKGROUNDS_KEYS.Chaos) ?? []
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#if backgroundPath?.length === 2}
	<img src={Assets.getBackground(backgroundPath.at(0) ?? '')} alt="" />
	<img src={Assets.getBackground(backgroundPath.at(1) ?? '')} alt="" />
{/if}

{#if bgmPath}
	<audio controls src={Assets.getBgm(bgmPath)}></audio>
{/if}
