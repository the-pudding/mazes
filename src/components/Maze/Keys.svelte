<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";

	const { getGameState } = getContext("maze");
	const gameState = getGameState();
</script>

<div class="instructions" class:background={$gameState === "pre"}>
	<div class="keys">
		{#each ["up", "left", "down", "right"] as direction}
			<div class={`key ${direction}`}>
				<Icon name={`arrow-${direction}`} />
			</div>
		{/each}
	</div>
	<div class="text">Use arrow keys to navigate</div>
</div>

<style>
	.instructions {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.background {
		background: white;
		padding: 0.5rem;
	}
	.text {
		text-align: center;
		max-width: 100px;
		font-size: 0.9rem;
		color: var(--color-pp-text-gray);
		margin-top: 4px;
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
	.up {
		grid-row: 1;
		grid-column: 2;
	}
	.left {
		grid-row: 2;
		grid-column: 1;
	}
	.down {
		grid-row: 2;
		grid-column: 2;
	}
	.right {
		grid-row: 2;
		grid-column: 3;
	}
</style>
