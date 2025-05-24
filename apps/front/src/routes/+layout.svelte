<script lang="ts">
	import '../app.css'
	import { userStore } from '../stores/user'
	import { toast, Toaster } from 'svelte-sonner'
	import Icon from '@iconify/svelte'
	import { page } from '$app/stores'

	let { children, data } = $props()

	let user = userStore()

	if (data.isLogged) {
		user.value = data.user
	}

	let isDrawerOpen = $state(false)
	const close = () => {
		isDrawerOpen = false
	}

	page.subscribe(({ error }) => {
		if (error) {
			toast.error(error.message)
		}
	})
</script>

<Toaster position="bottom-right" richColors closeButton expand />

{#snippet navbar()}
	<li><a href="/" class="flex items-center gap-4"><Icon icon="iconamoon:home" /> Accueil</a></li>
	<li>
		<a href="/characters" class="flex items-center">
			<Icon icon="game-icons:character" /> Personnages
		</a>
	</li>
{/snippet}

<div class="drawer p-4">
	<input
		id="my-drawer"
		type="checkbox"
		checked={isDrawerOpen}
		onchange={(e) => (isDrawerOpen = e.currentTarget.checked)}
		class="drawer-toggle"
	/>
	<div class="drawer-content">
		<label for="my-drawer" class="btn btn-primary drawer-button lg:hidden">
			<Icon icon="iconamoon:menu-burger-horizontal-bold" />
		</label>
		<div class="hidden flex-none lg:block">
			<ul class="menu menu-horizontal">
				{@render navbar()}
			</ul>
		</div>
	</div>
	<div class="drawer-side bg-base-200 text-base-content min-h-full">
		<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay">{isDrawerOpen}</label>
		<div class="content bg-base-200 text-base-content min-h-full w-80 p-4" onclickcapture={close}>
			<div class="flex flex-col gap-2">
				<ul class="menu">
					{@render navbar()}
				</ul>
			</div>

			<footer class="footer p-10">
				{#if user.value?.id}
					<!-- content here -->
					<a href="/users/{user.value?.id}">
						{user.value.username}
					</a>
				{:else}
					<a href="/login">Se connecter</a>
				{/if}
			</footer>
		</div>
	</div>
</div>

{@render children()}

<style lang="scss">
	.drawer-side {
		.content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
</style>
