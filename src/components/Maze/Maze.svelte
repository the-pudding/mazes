<script>
	import Walls from "$components/Maze/Walls.svelte";
	import Path from "$components/Maze/Path.svelte";
	import Intro from "$components/Maze/Intro.svelte";
	import Footer from "$components/Maze/Footer.svelte";
	import Overlay from "$components/Maze/Overlay.svelte";
	import { writable } from "svelte/store";
	import { setContext } from "svelte";
	import { pathLength } from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import viewport from "$stores/viewport.js";
	import mq from "$stores/mq.js";
	import _ from "lodash";

	export let wallData;
	export let size;
	export let playable;
	export let animated;
	export let intro = false;
	export let loading = false;
	export let mazePath = [{ row: 0, col: 0 }];

	const data = writable(wallData);
	const solution = writable([]);
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
		getSolution: () => solution,
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
	$: mobile = $viewport.width < 600;
	$: $width = mobile || intro ? $availableWidth : $availableWidth * 0.9;
	$: $wallWidth = $width / 50;
	$: $padding = $wallWidth / 2;
	$: $cellSize = $dims ? ($width - $padding * 2) / $dims : 0;
	$: $pathLength = $path.length - 1;
	$: labelsVisible = $gameState === "mid";
	$: $solution = _.orderBy(
		_.flatten(wallData).filter((d) => d.solutionIndex !== null),
		"solutionIndex",
		"asc"
	);

	$: if ($location.row === $dims - 1 && $location.col === $dims - 1) {
		$gameState = "post";
	}
</script>

<div class="container" bind:clientWidth={$availableWidth}>
	{#if $width}
		<svg width={$width} height={$width} class:filled={intro}>
			{#if !loading}
				<g
					class="fade"
					transition:fade={{ duration: $mq.reducedMotion ? 0 : 500 }}
				>
					<Walls />

					{#if playable}
						<Path />
					{:else if intro}
						<Intro />
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
			style:top={`${$width}px`}
		>
			finish
		</div>

		{#if playable}
			<Overlay {loading} />
			<Footer />
		{/if}
	{/if}
</div>

<style>
	svg.filled {
		background: var(--upper-bg);
	}
	.container {
		width: 100%;
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
