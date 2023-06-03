<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Modal/Path.svelte";
	import data from "$data/iowa.json";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	export let playable;
	export let percentOfWallsShowing;

	const width = writable(0);
	const cellSize = writable(0);
	const padding = writable(0);
	const percentWalls = writable(0);
	const location = writable({ row: 0, col: 0 });
	const wallWidth = 10;

	setContext("maze", {
		data,
		wallWidth,
		playable,
		getPercentWalls: () => percentWalls,
		getCellSize: () => cellSize,
		getWidth: () => width,
		getPadding: () => padding,
		getLocation: () => location
	});

	$: $padding = wallWidth / 2;
	$: $cellSize = ($width - $padding * 2) / data.length;
	$: $percentWalls = percentOfWallsShowing || 100;

	// pass to walls the filtered data it should use if percentWalls < 100
	// bin cells into n groups, have n be passed in as a prop
	// keep track of which groups are visible
	// animate in new ones / animate out old ones (probably handled in walls.svelte)
</script>

<div class="container" bind:clientWidth={$width}>
	{#if $width}
		<svg width={$width} height={$width}>
			<Walls />
			{#if playable}<Path />{/if}
		</svg>
	{/if}
</div>

<style>
	svg {
		background: white;
	}
	.container {
		width: 100%;
	}
</style>
