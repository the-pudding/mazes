<script>
	import Controls from "$components/Maze/Controls.svelte";
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	export let wallData;
	export let size;
	export let playable;
	export let animated;

	const data = writable(wallData);
	const width = writable(0);
	const cellSize = writable(0);
	const wallWidth = writable(0);
	const padding = writable(0);
	const location = writable({ row: 0, col: 0 });
	const path = writable([{ row: 0, col: 0 }]);
	const gameState = writable("pre");

	setContext("maze", {
		size,
		wallWidth,
		playable,
		animated,
		getData: () => data,
		getCellSize: () => cellSize,
		getWallWidth: () => wallWidth,
		getWidth: () => width,
		getPadding: () => padding,
		getLocation: () => location,
		getPath: () => path,
		getGameState: () => gameState
	});

	$: $data = wallData;
	$: $wallWidth = $width / 50;
	$: $padding = $wallWidth / 2;
	$: $cellSize = size ? ($width - $padding * 2) / size : 0;

	$: if ($location.row === size - 1 && $location.col === size - 1) {
		// todo change back
		$gameState = "post";
	}
</script>

<div class="container" bind:clientWidth={$width}>
	{#if $width}
		<svg width={$width} height={$width}>
			<Walls />
			{#if playable && $gameState !== "pre"}
				<Path />
			{/if}

			<text x={$width / 2} y={$width / 2} class:visible={$gameState === "post"}>
				Maze completed!
			</text>
		</svg>

		{#if playable}
			<Controls />
		{/if}
	{/if}
</div>

<style>
	.container {
		width: 100%;
	}
	text {
		dominant-baseline: middle;
		text-anchor: middle;
		font-size: 2rem;
		font-weight: 700;
		fill: var(--color-text);
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.5);
	}
	text.visible {
		opacity: 1;
	}
</style>
