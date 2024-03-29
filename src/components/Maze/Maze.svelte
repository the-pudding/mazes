<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import IntroPaths from "$components/Maze/Intro.Paths.svelte";
	import Footer from "$components/Maze/Footer.svelte";
	import Overlay from "$components/Maze/Overlay.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { pathLength, globalGameState } from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import viewport from "$stores/viewport.js";
	import mq from "$stores/mq.js";
	import _ from "lodash";

	export let availableSpace;
	export let wallData;
	export let numCells;
	export let playable;
	export let animated;
	export let intro = false;
	export let loading = false;
	export let mazePath = [{ row: 0, col: 0 }];
	export let simple;

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
		playable,
		animated,
		intro,
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

	$: $globalGameState = $gameState;
	$: $data = wallData;
	$: $path = mazePath;
	$: $spaceAvailable = availableSpace;
	$: $mazeSize = availableSpace - 100;
	$: $dims = numCells;
	$: mobile = $viewport.width < 600;
	$: withPadding = mobile && intro;
	$: $wallWidth = $mazeSize / 50;
	$: $padding = $wallWidth / 2;
	$: $cellSize = $dims ? ($mazeSize - $padding * 2) / $dims : 0;
	$: $pathLength = $path.length - 1;
	$: labelsVisible = $gameState === "mid" && !mobile;
	$: $solution = _.orderBy(
		_.flatten(intro ? simple : wallData).filter(
			(d) => d.solutionIndex !== null
		),
		"solutionIndex",
		"asc"
	);

	$: if ($location.row === $dims - 1 && $location.col === $dims - 1) {
		$gameState = "post";
	}
</script>

<div
	class="container"
	style:width={`${$spaceAvailable}px`}
	style:height={`${$spaceAvailable}px`}
>
	{#if $mazeSize}
		<svg width={$mazeSize} height={$mazeSize} class:filled={intro}>
			{#if !loading}
				<g
					class="fade"
					style:transform={withPadding
						? `translate(${mobilePadding / 2}px, 0)`
						: null}
					transition:fade={{ duration: $mq.reducedMotion ? 0 : 500 }}
				>
					<Walls />

					{#if playable}
						<Path />
					{:else if intro}
						<IntroPaths />
					{/if}
				</g>
			{/if}
		</svg>

		<div
			class="label"
			class:visible={labelsVisible}
			style:top={0}
			style:left={0}
			style:transform={`translate(0, -100%)`}
		>
			start
		</div>
		<div
			class="label"
			class:visible={labelsVisible}
			style:right={0}
			style:top={`${$mazeSize}px`}
		>
			finish
		</div>

		{#if playable}
			<Overlay {loading} />
			{#if !mobile}
				<Footer />
			{/if}
		{/if}
	{/if}
</div>

<style>
	svg.filled {
		background: var(--upper-bg);
	}
	.container {
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.label {
		position: absolute;
		visibility: hidden;
		color: var(--color-pp-text-gray);
	}
	.visible {
		visibility: visible;
	}
</style>
