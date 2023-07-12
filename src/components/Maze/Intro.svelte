<script>
	import Path from "$components/Maze/Intro.Path.svelte";
	import { getContext } from "svelte";
	import _ from "lodash";
	import { scrollStep } from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import mq from "$stores/mq.js";

	const { getCellSize, getWallWidth, getSolution } = getContext("maze");
	const cellSize = getCellSize();
	const wallWidth = getWallWidth();
	const solution = getSolution();

	const paths = [
		[{ row: -1, col: 0 }, ...$solution.slice(0, 4)],
		$solution.slice(4, 8),
		$solution.slice(8, 12),
		$solution.slice(12, 16),
		[...$solution.slice(16), { row: 10, col: 9 }]
	];
	$: pathData = paths.map((path, i) => {
		const prevEnd =
			i !== 0 ? paths[i - 1][paths[i - 1].length - 1] : paths[0][0];
		const fullPath = i !== 0 ? [prevEnd, ...path] : path;

		const [prevRow, prevCol] = [prevEnd.row, prevEnd.col];
		const x = prevCol * $cellSize + ($cellSize + $wallWidth) / 2;
		const y = prevRow * $cellSize + ($cellSize + $wallWidth) / 2;
		const start = `M ${x} ${y}`;

		const d = fullPath.reduce((acc, { row, col }, i) => {
			if (i === 0) {
				return acc;
			}

			const prev = fullPath[i - 1];
			const [prevRow, prevCol] = [prev.row, prev.col];
			const [rowDiff, colDiff] = [row - prevRow, col - prevCol];

			if (rowDiff === 1) {
				return `${acc} v ${$cellSize}`;
			} else if (rowDiff === -1) {
				return `${acc} v -${$cellSize}`;
			} else if (colDiff === 1) {
				return `${acc} h ${$cellSize}`;
			} else if (colDiff === -1) {
				return `${acc} h -${$cellSize}`;
			}
		}, start);

		const endX =
			path[path.length - 1].col * $cellSize + ($cellSize + $wallWidth) / 2;
		const endY =
			path[path.length - 1].row * $cellSize + ($cellSize + $wallWidth) / 2;

		return { d, endX, endY };
	});
	$: bubbleSize = $cellSize * 1.5;
</script>

{#if $scrollStep < 6}
	<g
		id="intro-path"
		transition:fade={{ duration: mq.reducedMotion ? 0 : 1500 }}
	>
		{#each pathData as { d }, i}
			{@const visible = $scrollStep >= i + 1}
			<Path {i} {d} {visible} />
		{/each}

		{#each pathData.slice(0, pathData.length - 1) as { endX, endY }, i}
			{@const visible = $scrollStep === i + 1}
			<image
				href="assets/img/intro{i}.png"
				x={endX}
				y={endY}
				width={bubbleSize}
				height={bubbleSize}
				class:visible
			/>
		{/each}
	</g>
{/if}

<style>
	image {
		transform: translate(-50%, -50%) scale(0);
		transform-box: fill-box;
		transform-origin: center;
		transition: transform var(--1s) 0s ease-out;
	}
	image.visible {
		transform: translate(-50%, -50%) scale(1);
		transition: transform var(--1s) 0s ease-in;
	}
</style>
