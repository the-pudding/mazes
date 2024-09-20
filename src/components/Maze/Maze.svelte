<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import Keys from "$components/Maze/Keys.Desktop.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { pathLength, globalGameState } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";
	import { tick } from "svelte";

	export let availableSpace;
	export let wallData;
	export let numCells;
	export let animated;
	export let loading = false;
	export let mazePath = [{ row: 0, col: 0 }];

	const data = writable(wallData);
	const solution = writable([]);
	const spaceAvailable = writable(0);
	const mazeSize = writable(0);
	const dims = writable(0);
	const cellSize = writable(0);
	const wallWidth = writable(0);
	const padding = writable(0);
	const location = writable({ row: 0, col: 0 });
	const path = writable(mazePath);
	const gameState = writable("pre");
	const mobilePadding = 3;

	setContext("maze", {
		wallWidth,
		animated,
		getData: () => data,
		getSolution: () => solution,
		getCellSize: () => cellSize,
		getWallWidth: () => wallWidth,
		getSpaceAvailable: () => spaceAvailable,
		getMazeSize: () => mazeSize,
		getDims: () => dims,
		getPadding: () => padding,
		getLocation: () => location,
		getPath: () => path,
		getGameState: () => gameState
	});

	const start = () => {
		$gameState = "mid";
	};
	const reset = () => {
		$gameState = "mid";
		$location = { row: 0, col: 0 };
	};
	const solve = async () => {
		const solution = _.orderBy(
			$data.filter((d) => d.solutionIndex !== null),
			"solutionIndex",
			"asc"
		);
		$path = solution;
		$gameState = "post";
		$location = { row: $dims - 1, col: $dims - 1 };

		await tick();
		const readMoreLink = document.getElementById("read-more");
		readMoreLink.focus();
	};

	$: $globalGameState = $gameState;
	$: $data = wallData;
	$: $path = mazePath;
	$: $spaceAvailable = availableSpace;
	$: $mazeSize = availableSpace;
	$: $dims = numCells;
	$: mobile = $viewport.width < 600;
	$: withPadding = mobile;
	$: $wallWidth = $mazeSize / 50;
	$: $padding = $wallWidth / 2;
	$: $cellSize = $dims ? ($mazeSize - $padding * 2) / $dims : 0;
	$: $pathLength = $path.length - 1;
	$: $solution = _.orderBy(
		_.flatten(wallData).filter((d) => d.solutionIndex !== null),
		"solutionIndex",
		"asc"
	);
	$: if ($location.row === $dims - 1 && $location.col === $dims - 1) {
		$gameState = "post";
	}
</script>

<div class="maze-container" style:width={`${$spaceAvailable}px`}>
	{#if $mazeSize && $mazeSize > 0}
		<svg width={$mazeSize} height={$mazeSize}>
			{#if !loading}
				<g
					style:transform={withPadding
						? `translate(${mobilePadding / 2}px, 0)`
						: null}
				>
					<Walls />
					<Path />
				</g>
			{/if}
		</svg>
	{/if}

	<div class="below" style:width={`${$mazeSize}px`}>
		<div class="buttons">
			<button class="start" on:click={$gameState === "pre" ? start : reset}>
				{$gameState === "pre" ? "start" : "restart"} maze
			</button>
			<button class="solve" on:click={solve}>Complete the maze</button>
			<!-- <button class="reset" on:click={reset}>Reset</button> -->
		</div>

		<Keys />
	</div>
</div>

<style>
	.maze-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.below {
		margin-top: 1rem;
		display: flex;
		justify-content: space-between;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: start;
	}

	button.start {
		font-size: 1.2rem;
		color: white;
		background: var(--color-accent-orange);
		text-transform: uppercase;
		font-weight: bold;
		font-family: var(--mono);
		padding: 0.9rem 0.75rem;
	}
	button.solve {
		background: none;
		padding: 0;
		margin-top: 0.25rem;
		font-size: 0.9rem;
		font-family: var(--mono);
		color: var(--color-dark-tan);
	}
	button.reset {
		background: none;
		padding: 0;
		font-size: 0.9rem;
		margin-top: 0.25rem;
		font-family: var(--mono);
		color: var(--color-dark-tan);
	}
</style>
