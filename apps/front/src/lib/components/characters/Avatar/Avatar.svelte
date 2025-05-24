<script lang="ts">
	import { CHARACTERS_KEYS, CHARACTERS_ICONS } from '@hoe/assets'
	import { Assets } from '$lib'

	export type Props = {
		skin: CHARACTERS_KEYS
		className: string
	}

	let { skin, className }: Props = $props()
</script>

<img
	src={Assets.getCharacterIcon(CHARACTERS_ICONS.get(skin) ?? '')}
	alt={skin}
	class="rounded-full {className}"
/>
