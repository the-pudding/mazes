<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import IntroPath from "$components/Maze/IntroPath.svelte";
	import Footer from "$components/Maze/Footer.svelte";
	import Overlay from "$components/Maze/Overlay.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { pathLength } from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import mq from "$stores/mq.js";

	export let wallData;
	export let size;
	export let playable;
	export let animated;
	export let intro = false;
	export let loading = false;
	export let mazePath = [{ row: 0, col: 0 }];

	const data = writable(wallData);
	const availableWidth = writable(0);
	const width = writable(0);
	const dims = writable(0);
	const cellSize = writable(0);
	const wallWidth = writable(0);
	const padding = writable(0);
	const location = writable({ row: 0, col: 0 });
	const path = writable(mazePath);
	const gameState = writable("pre");

	setContext("maze", {
		wallWidth,
		playable,
		animated,
		intro,
		getData: () => data,
		getCellSize: () => cellSize,
		getWallWidth: () => wallWidth,
		getAvailableWidth: () => availableWidth,
		getWidth: () => width,
		getDims: () => dims,
		getPadding: () => padding,
		getLocation: () => location,
		getPath: () => path,
		getGameState: () => gameState
	});

	$: $data = wallData;
	$: $path = mazePath;
	$: $dims = size;
	$: $width = $mq.desktop ? $availableWidth : $availableWidth * 0.9;
	$: $wallWidth = $width / 50;
	$: $padding = $wallWidth / 2;
	$: $cellSize = $dims ? ($width - $padding * 2) / $dims : 0;
	$: $pathLength = $path.length - 1;

	$: if ($location.row === $dims - 1 && $location.col === $dims - 1) {
		$gameState = "post";
	}
</script>

<div class="container" bind:clientWidth={$availableWidth}>
	{#if $width}
		<svg width={$width} height={$width}>
			{#if !loading}
				<g
					class="fade"
					transition:fade={{ duration: $mq.reducedMotion ? 0 : 500 }}
				>
					<Walls />

					{#if playable}
						<Path />
					{:else if intro}
						<IntroPath />
					{/if}
				</g>
			{/if}
		</svg>

		{#if playable}
			<Overlay {loading} />
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
