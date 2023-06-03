<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Modal/Path.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	export let wallData;
	export let size;
	export let playable;
	export let animated;

	const data = writable(wallData);
	const width = writable(0);
	const cellSize = writable(0);
	const padding = writable(0);
	const location = writable({ row: 0, col: 0 });
	const wallWidth = 10;

	setContext("maze", {
		size,
		wallWidth,
		playable,
		animated,
		getData: () => data,
		getCellSize: () => cellSize,
		getWidth: () => width,
		getPadding: () => padding,
		getLocation: () => location
	});

	$: $data = wallData;
	$: $padding = wallWidth / 2;
	$: $cellSize = size ? ($width - $padding * 2) / size : 0;
</script>

<div class="container" bind:clientWidth={$width}>
	{#if $width}
		<svg width={$width} height={$width}>
			<Walls />
			{#if playable}
				<Path />
			{/if}
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