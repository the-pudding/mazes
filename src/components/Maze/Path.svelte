<script>
	import { getContext } from "svelte";
	import mq from "$stores/mq.js";
	import { tweened } from "svelte/motion";
	import { draw } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	const {
		getData,
		getCellSize,
		getLocation,
		getPath,
		getWallWidth,
		getGameState
	} = getContext("maze");
	const data = getData();
	const cellSize = getCellSize();
	const location = getLocation();
	const path = getPath();
	const wallWidth = getWallWidth();
	const gameState = getGameState();

	let pathStr;
	let animatedPathStr;
	let inProgress = { x: false, y: false };
	const dur = 200;
	const circleX = tweened(($cellSize + $wallWidth) / 2, {
		duration: $mq.reducedMotion ? 0 : dur
	});
	const circleY = tweened(($cellSize + $wallWidth) / 2, {
		duration: $mq.reducedMotion ? 0 : dur
	});

	$: if ($location.row === 0 && $location.col === 0) {
		$path = [{ row: 0, col: 0 }];
		animatedPathStr = "";
	}
	$: currentCenterX = $location.col * $cellSize + ($cellSize + $wallWidth) / 2;
	$: currentCenterY = $location.row * $cellSize + ($cellSize + $wallWidth) / 2;
	$: {
		circleX.set(currentCenterX).then(() => {
			inProgress.x = false;
		});
		circleY.set(currentCenterY).then(() => {
			inProgress.y = false;
		});
	}

	$: $path, $cellSize, $wallWidth, updatePath();
	const updatePath = () => {
		pathStr = $path
			.slice(0, $path.length - 1)
			.reduce((acc, { row, col }, i) => {
				if (i === 0) {
					return acc;
				}

				const prev = $path[i - 1];
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
			}, `M ${($cellSize + $wallWidth) / 2} ${($cellSize + $wallWidth) / 2}`);

		let mostRecentMove = "";
		if ($path.length > 1) {
			const prev = $path[$path.length - 2];
			const [prevRow, prevCol] = [prev.row, prev.col];
			const [rowDiff, colDiff] = [
				$location.row - prevRow,
				$location.col - prevCol
			];

			if (rowDiff === 1) {
				mostRecentMove = `v ${$cellSize}`;
			} else if (rowDiff === -1) {
				mostRecentMove = `v -${$cellSize}`;
			} else if (colDiff === 1) {
				mostRecentMove = `h ${$cellSize}`;
			} else if (colDiff === -1) {
				mostRecentMove = `h -${$cellSize}`;
			}

			let prevCenterX = prevCol * $cellSize + ($cellSize + $wallWidth) / 2;
			let prevCenterY = prevRow * $cellSize + ($cellSize + $wallWidth) / 2;

			animatedPathStr = `M ${prevCenterX} ${prevCenterY} ${mostRecentMove}`;
		}
	};

	const onKeyDown = (e) => {
		if ($gameState === "post" || inProgress.x || inProgress.y) return;

		const current = $data[$location.row][$location.col];
		const [top, right, bottom, left] = current.walls;

		const validLeft = e.keyCode === 37 && !left;
		const validRight = e.keyCode === 39 && !right;
		const validUp = e.keyCode === 38 && !top;
		const validDown = e.keyCode === 40 && !bottom;

		if (validLeft || validRight || validUp || validDown) {
			inProgress = { x: true, y: true };
			if (validLeft) {
				$location = { row: $location.row, col: $location.col - 1 };
			} else if (validUp) {
				$location = { row: $location.row - 1, col: $location.col };
			} else if (validRight) {
				$location = { row: $location.row, col: $location.col + 1 };
			} else if (validDown) {
				$location = { row: $location.row + 1, col: $location.col };
			}
			$path = [...$path, $location];
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />
<g class="path" class:faded={$gameState === "post"}>
	<circle cx={$circleX} cy={$circleY} r={$cellSize / 4} />

	<path class="full" d={pathStr} />

	{#key animatedPathStr}
		<path
			class="animated"
			d={animatedPathStr}
			in:draw={{ duration: dur * 4, delay: dur / 2, easing: quintOut }}
		/>
	{/key}
</g>

<style>
	circle {
		fill: magenta;
	}
	path.full {
		stroke: magenta;
		stroke-width: 10;
		fill: none;
	}
	path.animated {
		stroke: magenta;
		stroke-width: 10;
		fill: none;
	}
	g {
		transition: opacity calc(var(--1s) * 0.5);
	}
	.faded {
		opacity: 0.2;
	}
</style>
