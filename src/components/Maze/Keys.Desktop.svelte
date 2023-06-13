<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";

	export let background = false;

	const { getGameState } = getContext("maze");
	const gameState = getGameState();
</script>

<div class="container" class:background>
	<div class="keys">
		{#each ["up", "left", "down", "right"] as direction}
			<span class={`key ${direction}`}>
				<Icon name={`arrow-${direction}`} />
			</span>
		{/each}
	</div>
	<div class="text">Use arrow keys to navigate</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.background {
		background: white;
		padding: 0.5rem;
	}
	.text {
		color: var(--color-pp-text-gray);
		font-size: 0.9rem;
		margin-top: 4px;
		text-align: center;
		max-width: 100px;
	}
	.keys {
		display: grid;
		grid-template-rows: 22px 22px;
		grid-template-columns: 22px 22px 22px;
		gap: 4px;
	}
	.key {
		background: var(--color-pp-gray-1);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		border-radius: 4px;
		font-size: 0.7rem;
	}
	span.up {
		grid-row: 1;
		grid-column: 2;
	}
	span.left {
		grid-row: 2;
		grid-column: 1;
	}
	span.down {
		grid-row: 2;
		grid-column: 2;
	}
	span.right {
		grid-row: 2;
		grid-column: 3;
	}
</style>
