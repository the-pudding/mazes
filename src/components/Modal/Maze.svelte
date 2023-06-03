<script>
	import Walls from "$components/Modal/Walls.svelte";
	import Path from "$components/Modal/Path.svelte";
	import data from "$data/iowa.json";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";

	const width = writable(0);
	const cellSize = writable(0);
	const padding = writable(0);
	const location = writable({ row: 0, col: 0 });
	const wallWidth = 10;

	setContext("maze", {
		data,
		wallWidth,
		getCellSize: () => cellSize,
		getWidth: () => width,
		getPadding: () => padding,
		getLocation: () => location
	});

	$: $padding = wallWidth / 2;
	$: $cellSize = ($width - $padding * 2) / data.length;
</script>

<div class="container" bind:clientWidth={$width}>
	{#if $width}
		<svg width={$width} height={$width}>
			<Walls />
			<Path />
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
