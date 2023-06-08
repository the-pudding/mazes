<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import Footer from "$components/Maze/Footer.svelte";
	import Overlay from "$components/Maze/Overlay.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { pathLength } from "$stores/misc.js";
	import mq from "$stores/mq.js";

	export let wallData;
	export let size;
	export let playable;
	export let animated;

	const data = writable(wallData);
	const availableWidth = writable(0);
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
		getAvailableWidth: () => availableWidth,
		getWidth: () => width,
		getPadding: () => padding,
		getLocation: () => location,
		getPath: () => path,
		getGameState: () => gameState
	});

	$: $width = $mq.desktop ? $availableWidth : $availableWidth * 0.9;
	$: $data = wallData;
	$: $wallWidth = $width / 200;
	$: $padding = $wallWidth / 2;
	$: $cellSize = size ? ($width - $padding * 2) / size : 0;
	$: $pathLength = $path.length - 1;

	$: if ($location.row === size - 1 && $location.col === size - 1) {
		$gameState = "post";
	}
</script>

<div class="container" bind:clientWidth={$availableWidth}>
	{#if $width}
		<svg width={$width} height={$width}>
			<Walls />
			{#if playable && $gameState !== "pre"}
				<Path />
			{/if}
		</svg>

		{#if playable}
			<Overlay />
			<Footer />
		{/if}
	{/if}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
