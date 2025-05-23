<script lang="ts">
	import type { CharacterEntity } from '@hoe/db'
	import Avatar from '../Avatar/Avatar.svelte'

	interface Props {
		character: CharacterEntity
	}
	let { character }: Props = $props()
</script>

<div class="card">
	<figure>
		<Avatar skin={character.skin} className="h-12 w-12" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{character.name}</h2>
		<p>{character.job} de niveau {character.level}</p>

		<div></div>
	</div>
</div>
