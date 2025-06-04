<script lang="ts">
	import { chatStore } from '../../../stores/chat.svelte'
	import { userStore } from '../../../stores/user'
	import Icon from '@iconify/svelte'
	import { page } from '$app/stores'

	let { disabled } = $props()

	let isOpen = $state(false)
	let chat = chatStore()
	let user = userStore()
	let message: string = $state('')

	function sendMessage(): void {
		if (!message.trim()) {
			return
		}
		chat.send(message)
		message = ''
	}

	function handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			sendMessage()
		}
	}

	page.subscribe(({ error }) => {
		if (error) {
			chat.send(`Error: ${error.message}`)
		}
	})

	$effect(() => {
		if (isOpen && !chat.isConnected) {
			chat.connect()
		}
	})
</script>

<div class="fixed right-4 bottom-4 z-50">
	<!-- Toggle Button -->
	<button
		onclick={() => (isOpen = !isOpen)}
		class="rounded-full bg-blue-500 p-4 font-bold text-white transition-all duration-300 hover:bg-blue-700"
		class:bg-red-500={disabled}
		class:hover:bg-red-500={disabled}
	>
		<Icon icon="solar:letter-bold" class="h-6 w-6" />
	</button>

	<!-- Chat Modal -->
	{#if isOpen}
		<div class="fixed inset-0 z-50 backdrop-blur-sm">
			<div
				class="fixed right-4 bottom-4 flex h-[600px] w-96 flex-col overflow-hidden rounded-lg bg-white shadow-xl"
			>
				<!-- Header -->
				<div class="flex items-center justify-between rounded-t-lg bg-blue-500 p-4 text-white">
					<h2 class="text-lg font-bold">Chat</h2>
					<button onclick={() => (isOpen = false)} class="text-white hover:text-gray-300">
						<Icon icon="icon-park-outline:close" class="h-6 w-6" />
					</button>
				</div>

				<!-- Messages -->
				<div class="flex-1 overflow-y-auto p-4 text-black">
					{#if chat.value?.length}
						{#each chat.value as msg}
							<div
								class="mb-4 flex {msg.username === user.value?.username
									? 'justify-end'
									: 'justify-start'}"
							>
								<div
									class="max-w-[80%] rounded-lg p-3 {msg.username === user.value?.username
										? 'bg-blue-500'
										: 'bg-gray-100'}"
								>
									<p class="mb-1 text-sm text-gray-600">{msg.username}</p>
									<p>{msg.message}</p>
								</div>
							</div>
						{/each}
					{/if}
				</div>

				<div class="border-t p-4">
					<div class="flex gap-2">
						<input
							bind:value={message}
							onkeydown={handleKeyDown}
							placeholder="écrivez votre message..."
							class="flex-1 rounded-lg border p-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
						<button
							{disabled}
							class:bg-red-500={disabled}
							class:hover:bg-red-500={disabled}
							onclick={sendMessage}
							class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-700"
						>
							Envoyer
						</button>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
