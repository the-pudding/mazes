<script>
	import Controls from "$components/Maze/Controls.svelte";
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import Overlay from "$components/Maze/Overlay.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { mazeLocation } from "$stores/misc.js";

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
	$: $mazeLocation = $location;

	$: if ($location.row === size - 1 && $location.col === size - 1) {
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
		</svg>

		{#if playable}
			<Overlay />
			<Controls />
		{/if}
	{/if}
</div>

<style>
	.container {
		width: 100%;
	}
</style>
