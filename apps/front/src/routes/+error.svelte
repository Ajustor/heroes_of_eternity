<script lang="ts">
	import { page } from '$app/state'
</script>

<div class="flex h-full flex-col items-center justify-evenly">
	<h1 class="text-5xl">Une erreur est survenue !</h1>
	<h2 class="text-3xl">{page.error?.message}</h2>
	<img
		src={`https://http.cat/${page.status}`}
		alt={`l'image d'un chat qui correspond a l'erreur qu'on a eu coté server (${page.status})`}
	/>
</div>
