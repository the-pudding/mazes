<script>
	import Path from "$components/Maze/Intro.Path.svelte";
	import { getContext } from "svelte";
	import _ from "lodash";
	import { scrollStep, mazeData } from "$stores/misc.js";

	const { getCellSize, getWallWidth } = getContext("maze");
	const cellSize = getCellSize();
	const wallWidth = getWallWidth();

	const solution = _.orderBy(
		_.flatten($mazeData["il-simple"]).filter((d) => d.solutionIndex !== null),
		"solutionIndex",
		"asc"
	);
	const paths = [
		solution.slice(0, 8),
		solution.slice(8, 11),
		solution.slice(11, 16),
		solution.slice(16)
	];
	$: pathStrs = paths.map((path, i) => {
		const prevEnd =
			i !== 0 ? paths[i - 1][paths[i - 1].length - 1] : { row: 0, col: 0 };
		const fullPath = i !== 0 ? [prevEnd, ...path] : path;

		const [prevRow, prevCol] = [prevEnd.row, prevEnd.col];
		const x = prevCol * $cellSize + ($cellSize + $wallWidth) / 2;
		const y = prevRow * $cellSize + ($cellSize + $wallWidth) / 2;
		const start = `M ${x} ${y}`;

		return fullPath.reduce((acc, { row, col }, i) => {
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
	});
</script>

<g id="intro-path">
	{#each pathStrs as d, i}
		{@const visible = $scrollStep >= i + 1}
		<Path {i} {d} {visible} />
	{/each}
</g>
