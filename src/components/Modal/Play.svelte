<script>
	import Icon from "$components/helpers/Icon.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import data from "$data/iowa.json";
	import Button from "$components/Button.svelte";
</script>

<div class="maze">
	<Maze wallData={data} size={data.length} playable={false} animated={false} />
	<div class="bottom">
		<div class="buttons">
			<Button text="start maze" />
			<div class="text">Complete the maze</div>
		</div>

		<div class="instructions">
			<div class="keys">
				{#each ["up", "left", "down", "right"] as direction}
					<div class={`key ${direction}`}>
						<Icon name={`arrow-${direction}`} />
					</div>
				{/each}
			</div>
			<div class="text arrow">Use arrow keys to navigate</div>
		</div>
	</div>
</div>

<style>
	.maze {
		width: 100%;
		max-width: 380px;
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
	}
	.instructions {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.text {
		font-size: 0.9rem;
		color: var(--color-pp-text-gray);
		margin-top: 4px;
	}
	.text.arrow {
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
