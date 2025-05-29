<script lang="ts">
	import { Assets } from '@/index'
	import { BEASTS_KEYS, BEASTS, BOSSES } from '@hoe/assets'

	let { beast } = $props()
</script>

<div class="card bg-neutral w-96 p-5 shadow-sm" class:bg-red-800={beast.isBoss}>
	<figure>
		<img
			src={Assets.getBeast(BEASTS.get(beast.skin) ?? '') ??
				Assets.getBoss(BOSSES.get(beast.skin) ?? '')}
			alt={beast.skin}
		/>
	</figure>
	<div class="card-body">
		<h2 class="card-title">{beast.name}</h2>

		<div class="flex justify-between">
			<div class="flex gap-2">
				<p>XP</p>
				<p>{beast.experience}</p>
			</div>
			<div class="flex gap-2">
				<p>Vie</p>
				<p>{beast.maxLife}</p>
			</div>
			<div class="flex gap-2">
				<p>Mana</p>
				<p>{beast.maxMana}</p>
			</div>
		</div>
		<h3>Statistiques du monstre</h3>
		<div>
			<p>Intelligence : {beast.intelligence}</p>
			<p>Force : {beast.strength}</p>
			<p>Dextérité : {beast.dexterity}</p>
			<p>Agilité : {beast.agility}</p>
		</div>
	</div>
</div>
