<script lang="ts">
	import type { CharacterEntity } from '@hoe/db'
	import Avatar from '../Avatar/Avatar.svelte'

	export let characters: CharacterEntity[]
</script>

<div class="rounded-lg bg-gray-800 p-4">
	<h2 class="mb-4 text-2xl font-bold text-white">Score Board</h2>
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="bg-gray-700 text-white">
					<th class="px-4 py-2">Avatar</th>
					<th class="px-4 py-2">Name</th>
					<th class="px-4 py-2">Level</th>
					<th class="px-4 py-2">Job</th>
					<th class="px-4 py-2">XP</th>
					<th class="px-4 py-2">Life</th>
					<th class="px-4 py-2">Mana</th>
				</tr>
			</thead>
			<tbody>
				{#each characters as character}
					<tr class="border-t border-gray-700">
						<td class="px-4 py-2">
							<Avatar skin={character.skin} className="h-12 w-12" />
						</td>
						<td class="px-4 py-2 text-white">{character.name}</td>
						<td class="px-4 py-2 text-yellow-400">{character.level}</td>
						<td class="px-4 py-2">
							{character.job}
						</td>
						<td class="px-4 py-2 text-green-400">{character.experience || 0}</td>
						<td class="px-4 py-2">
							<div class="flex items-center">
								<span class="mr-2 text-white">{character.life}</span>
								<div class="h-2 w-24 rounded bg-gray-700">
									<div
										class="h-full rounded bg-red-500 transition-all duration-300"
										style="width: ${(character.life / character.maxLife) * 100}%"
									></div>
								</div>
							</div>
						</td>
						<td class="px-4 py-2">
							<div class="flex items-center">
								<span class="mr-2 text-white">{character.mana}</span>
								<div class="h-2 w-24 rounded bg-gray-700">
									<div
										class="h-full rounded bg-blue-500 transition-all duration-300"
										style="width: ${(character.mana / character.maxMana) * 100}%"
									></div>
								</div>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	/* Ajout d'animations pour les barres de vie et de mana */
	.transition-all {
		transition: width 0.3s ease-in-out;
	}
</style>
