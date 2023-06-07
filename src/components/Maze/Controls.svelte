<script>
	import Button from "$components/Button.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";
	import _ from "lodash";

	const { size, getData, getGameState, getLocation, getPath } =
		getContext("maze");
	const data = getData();
	const gameState = getGameState();
	const location = getLocation();
	const path = getPath();

	const start = () => {
		$gameState = "mid";
	};
	const reset = () => {
		$gameState = "mid";
		$location = { row: 0, col: 0 };
	};
	const solve = () => {
		const solution = _.flatten($data).filter((d) => d.solution);
		const solutionSorted = _.orderBy(solution, "solutionIndex", "asc");
		$path = solutionSorted;
		$gameState = "post";
		$location = { row: size - 1, col: size - 1 };
	};
</script>

<div class="bottom">
	<div class="buttons">
		<Button text="start maze" onClick={start} />
		<div class="text" on:click={solve}>Complete the maze</div>
		<div class="text" on:click={reset}>Reset</div>
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

<style>
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
	.text:not(.arrow):hover {
		cursor: pointer;
		color: black;
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
