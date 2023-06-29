<script>
	import { getContext } from "svelte";
	import { draw, fade } from "svelte/transition";
	import mq from "$stores/mq.js";
	import { selectedState } from "$stores/misc.js";

	const {
		animated,
		intro,
		getData,
		getCellSize,
		getWallWidth,
		getPadding,
		getGameState,
		getDims
	} = getContext("maze");
	const data = getData();
	const cellSize = getCellSize();
	const wallWidth = getWallWidth();
	const dims = getDims();
	const padding = getPadding();
	const gameState = getGameState();
</script>

<g
	style:transform={`translate(${$padding}px, ${$padding}px)`}
	class:faded={$selectedState &&
		($gameState === "post" || $gameState === "pre")}
>
	{#each $data as { row, col, walls }}
		{@const [top, right, bottom, left] = walls}
		{@const lineDraw = {
			duration: (animated || intro) && !$mq.reducedMotion ? 800 : 0,
			delay: (animated || intro) && !$mq.reducedMotion ? Math.random() * 400 : 0
		}}
		{#if top && (row !== 0 || col !== 0)}
			<line
				x1={col * $cellSize - $wallWidth / 2}
				x2={col * $cellSize + $cellSize + $wallWidth / 2}
				y1={row * $cellSize}
				y2={row * $cellSize}
				stroke-width={$wallWidth}
				transition:draw={lineDraw}
			/>
		{/if}

		{#if right}
			<line
				x1={col * $cellSize + $cellSize}
				x2={col * $cellSize + $cellSize}
				y1={row * $cellSize - $wallWidth / 2}
				y2={row * $cellSize + $cellSize + $wallWidth / 2}
				stroke-width={$wallWidth}
				transition:draw={lineDraw}
			/>
		{/if}

		{#if bottom && (row !== $dims - 1 || col !== $dims - 1)}
			<line
				x1={col * $cellSize + $cellSize + $wallWidth / 2}
				x2={col * $cellSize - $wallWidth / 2}
				y1={row * $cellSize + $cellSize}
				y2={row * $cellSize + $cellSize}
				stroke-width={$wallWidth}
				transition:draw={lineDraw}
			/>
		{/if}

		{#if left}
			<line
				x1={col * $cellSize}
				x2={col * $cellSize}
				y1={row * $cellSize + $cellSize + $wallWidth / 2}
				y2={row * $cellSize - $wallWidth / 2}
				stroke-width={$wallWidth}
				transition:draw={lineDraw}
			/>
		{/if}
	{/each}
</g>

<style>
	line {
		stroke: black;
	}
	rect {
		fill: none;
		stroke: none;
	}
	rect.start {
		fill: var(--color-pp-magenta);
		opacity: 0.2;
	}
	rect.finish {
		fill: var(--color-pp-magenta);
		opacity: 0.5;
	}
	g {
		transition: opacity calc(var(--1s) * 0.5) ease-in-out;
	}
	g.faded {
		opacity: 0.025;
	}
</style>
