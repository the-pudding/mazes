<script>
	import Keys from "$components/Maze/Keys.svelte";
	import Button from "$components/Button.svelte";
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

	$: buttonText = $gameState === "pre" ? "start maze" : "restart maze";
</script>

<div class="bottom" class:visible={$gameState !== "pre"}>
	<div class="buttons">
		<Button text={buttonText} onClick={$gameState === "pre" ? start : reset} />
		<button
			class="complete text"
			on:click={solve}
			disabled={$gameState === "post"}>Complete the maze</button
		>
	</div>

	<Keys />
</div>

<style>
	.bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 1rem;
		visibility: hidden;
	}
	.visible {
		visibility: visible;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.text {
		font-size: 0.9rem;
		color: var(--color-pp-text-gray);
		margin-top: 4px;
	}
	button.complete {
		background: none;
	}
	button.complete:hover {
		color: black;
	}
</style>
