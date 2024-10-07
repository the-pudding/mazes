<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import Keys from "$components/Maze/Keys.Desktop.svelte";
	import { writable } from "svelte/store";
	import { onMount, setContext } from "svelte";
	import { pathLength, globalGameState, selectedState } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";
	import localStorage from "$utils/localStorage.js";
	import checkIcon from "$svg/check-orange.svg";

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

	let userSolved = true;
	let started = false;

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
		started = true;
		$gameState = "mid";
	};
	const reset = () => {
		$gameState = "mid";
		$location = { row: 0, col: 0 };
		userSolved = true;
	};
	const solve = async () => {
		userSolved = false;
		const solution = _.orderBy(
			$data.filter((d) => d.solutionIndex !== null),
			"solutionIndex",
			"asc"
		);
		$path = solution;
		$gameState = "post";
		$location = { row: $dims - 1, col: $dims - 1 };
	};
	const logSolve = () => {
		const current = localStorage.get("mazes");
		if (!current) {
			localStorage.set("mazes", [{ id: $selectedState, path: $path }]);
		} else {
			localStorage.set("mazes", [
				...current.filter((d) => d.id !== $selectedState),
				{ id: $selectedState, path: $path }
			]);
		}
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
		if (userSolved) logSolve();
		$gameState = "post";
	}

	onMount(() => {
		const mazesSolved = localStorage.get("mazes");
		const alreadySolved =
			mazesSolved && mazesSolved.find((d) => d.id === $selectedState);
		if (alreadySolved) {
			$path = alreadySolved.path;
			$location = { row: $dims - 1, col: $dims - 1 };
			started = true;
			$gameState = "post";
		}
	});
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

	<div
		class="overlay"
		style:height={`${$mazeSize}px`}
		class:visible={$gameState === "post"}
	>
		{#if userSolved}<span class="icon">{@html checkIcon}</span>{/if}
		<button class="return" on:click={() => ($selectedState = undefined)}
			>Return to full map</button
		>
	</div>

	<div class="below" style:width={`${$mazeSize}px`}>
		<div class="buttons">
			<button
				class="start"
				class:bounce={!started}
				on:click={$gameState === "pre" ? start : reset}
			>
				{$gameState === "pre" ? "start" : "restart"} maze
			</button>
			<button class="solve" on:click={solve}>Complete the maze</button>
		</div>

		<Keys />
	</div>
</div>

<style>
	.maze-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}
	.overlay {
		width: 100%;

		position: absolute;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.overlay.visible {
		opacity: 1;
	}
	.icon {
		display: flex;
		height: 40px;
		width: 40px;
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
	button.return {
		background: none;
		color: var(--color-fg);
		padding: 0;
		margin: 0.5rem 0;
		font-weight: bold;
		font-size: 1.6rem;
		text-align: center;
	}
	.bounce {
		animation: bounce 0.7s ease-in-out infinite;
	}
	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
