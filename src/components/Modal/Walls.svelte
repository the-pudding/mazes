<script>
	import { getContext } from "svelte";

	const { data, wallWidth, getCellSize, getPadding } = getContext("maze");
	const cellSize = getCellSize();
	const padding = getPadding();
</script>

<g style:transform={`translate(${$padding}px, ${$padding}px)`}>
	{#each data as d}
		{#each d as { row, col }}
			{@const start = row === 0 && col === 0}
			{@const finish = row === data.length - 1 && col === data.length - 1}
			<rect
				x={col * $cellSize}
				y={row * $cellSize}
				width={$cellSize}
				height={$cellSize}
				class:start
				class:finish
			/>
		{/each}
	{/each}

	{#each data as d}
		{#each d as { row, col, walls }, j}
			{@const [top, right, bottom, left] = walls}
			{#if top}
				<line
					x1={col * $cellSize - wallWidth / 2}
					x2={col * $cellSize + $cellSize + wallWidth / 2}
					y1={row * $cellSize}
					y2={row * $cellSize}
					stroke-width={wallWidth}
				/>
			{/if}

			{#if right}
				<line
					x1={col * $cellSize + $cellSize}
					x2={col * $cellSize + $cellSize}
					y1={row * $cellSize - wallWidth / 2}
					y2={row * $cellSize + $cellSize + wallWidth / 2}
					stroke-width={wallWidth}
				/>
			{/if}

			{#if bottom}
				<line
					x1={col * $cellSize + $cellSize + wallWidth / 2}
					x2={col * $cellSize - wallWidth / 2}
					y1={row * $cellSize + $cellSize}
					y2={row * $cellSize + $cellSize}
					stroke-width={wallWidth}
				/>
			{/if}

			{#if left}
				<line
					x1={col * $cellSize}
					x2={col * $cellSize}
					y1={row * $cellSize + $cellSize + wallWidth / 2}
					y2={row * $cellSize - wallWidth / 2}
					stroke-width={wallWidth}
				/>
			{/if}
		{/each}
	{/each}
</g>

<style>
	line {
		stroke: black;
	}
	rect {
		fill: white;
		stroke: none;
	}
	rect.start {
		fill: magenta;
		opacity: 0.2;
	}
	rect.finish {
		fill: magenta;
		opacity: 0.5;
	}
</style>
