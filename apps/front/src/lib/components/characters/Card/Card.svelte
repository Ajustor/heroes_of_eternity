<script lang="ts">
	import Avatar from '../Avatar/Avatar.svelte'

	let { character, isMine } = $props()
</script>

<div
	class="card bg-neutral w-96 p-5 shadow-sm"
	class:highlight={isMine}
	class:bg-red-800={character.life === 0}
>
	<figure>
		<Avatar skin={character.skin} className="h-24 w-24" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{character.name}</h2>
		<p>{character.job} de niveau {character.level}</p>

		<div class="flex justify-between">
			<div class="flex gap-2">
				<p>XP</p>
				<p>{character.experience}</p>
			</div>
			<div class="flex gap-2">
				<p>Vie</p>
				<p>{character.life}/{character.maxLife}</p>
			</div>
			<div class="flex gap-2">
				<p>Mana</p>
				<p>{character.mana}/{character.maxMana}</p>
			</div>
		</div>
		<div class="collapse-arrow collapse">
			<input type="radio" name="stats" />
			<div class="collapse-title">Statistiques du personnage</div>
			<div class="collapse-content">
				<p>Intelligence : {character.intelligence}</p>
				<p>Force : {character.strength}</p>
				<p>Dextérité : {character.dexterity}</p>
				<p>Agilité : {character.agility}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.highlight {
		box-shadow: 0 0 0 2px #fff01f;
	}
</style>
