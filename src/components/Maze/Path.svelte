<script>
	import { getContext } from "svelte";
	import mq from "$stores/mq.js";
	import { tweened } from "svelte/motion";
	import { draw } from "svelte/transition";
	import { quintOut } from "svelte/easing";
	import _ from "lodash";
	import { previous } from "$stores/previous.js";

	const {
		getData,
		getCellSize,
		getLocation,
		getPath,
		getWallWidth,
		getGameState,
		playable,
		intro
	} = getContext("maze");
	const data = getData();
	const cellSize = getCellSize();
	const location = getLocation();
	const path = getPath();
	const wallWidth = getWallWidth();
	const gameState = getGameState();
	const prevPath = previous(path);

	let pathStr;
	let animatedPathStr;
	let inProgress = { x: false, y: false };
	const circleX = tweened(($cellSize + $wallWidth) / 2);
	const circleY = tweened(($cellSize + $wallWidth) / 2);

	$: dur = intro ? 1000 : 100;
	$: pathStrokeWidth = $cellSize * 0.25;
	$: if ($location.row === 0 && $location.col === 0) {
		$path = [{ row: 0, col: 0 }];
		animatedPathStr = "";
	}
	$: currentCenterX = $location.col * $cellSize + ($cellSize + $wallWidth) / 2;
	$: currentCenterY = $location.row * $cellSize + ($cellSize + $wallWidth) / 2;
	$: moveImmedietly =
		$gameState === "post" ||
		($location.col === 0 && $location.row === 0) ||
		$mq.reducedMotion;
	$: {
		circleX
			.set(currentCenterX, { duration: moveImmedietly ? 0 : dur })
			.then(() => {
				inProgress.x = false;
			});
		circleY
			.set(currentCenterY, { duration: moveImmedietly ? 0 : dur })
			.then(() => {
				inProgress.y = false;
			});
	}

	const arrayToPath = (arr, start) => {
		return arr.reduce((acc, { row, col }, i) => {
			if (i === 0) {
				return acc;
			}

			const prev = arr[i - 1];
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
	};
	$: console.log("path", $path);
	$: console.log("prev", $prevPath);

	$: $path, $cellSize, $wallWidth, updatePath();
	const updatePath = () => {
		pathStr = arrayToPath(
			$prevPath, //$path.slice(0, $gameState === "post" ? $path.length : $path.length - 1),
			`M ${($cellSize + $wallWidth) / 2} ${($cellSize + $wallWidth) / 2}`
		);

		if (intro) {
			let newSteps =
				$path.length > $prevPath.length ? _.difference($path, $prevPath) : null;
			if (newSteps === null) {
				animatedPathStr = "";
				return;
			}

			const startIndex = $path.findIndex(
				(d) => d.row === newSteps[0].row && d.col === newSteps[0].col
			);
			if (startIndex) newSteps = [$path[startIndex - 1], ...newSteps];
			if (newSteps.length > 1) {
				animatedPathStr = arrayToPath(
					newSteps,
					`M ${newSteps[0].col * $cellSize + ($cellSize + $wallWidth) / 2} ${
						newSteps[0].row * $cellSize + ($cellSize + $wallWidth) / 2
					}`
				);
			}
		} else if ($path.length > 1) {
			let mostRecentMove = "";

			const prev = $path[$path.length - 2];
			const [prevRow, prevCol] = [prev.row, prev.col];
			const [rowDiff, colDiff] = [
				$location.row - prevRow,
				$location.col - prevCol
			];
			let prevCenterX = prevCol * $cellSize + ($cellSize + $wallWidth) / 2;
			let prevCenterY = prevRow * $cellSize + ($cellSize + $wallWidth) / 2;

			const twoAgo = $path.length > 2 ? $path[$path.length - 3] : null;
			const doubleBack =
				twoAgo && twoAgo.row === $location.row && twoAgo.col === $location.col;

			if (rowDiff === 1) {
				mostRecentMove = `v ${$cellSize}`;
				if ((prevRow !== 0 || prevCol !== 0) && !doubleBack)
					prevCenterY -= pathStrokeWidth / 2;
			} else if (rowDiff === -1) {
				mostRecentMove = `v -${$cellSize}`;
				if ((prevRow !== 0 || prevCol !== 0) && !doubleBack)
					prevCenterY += pathStrokeWidth / 2;
			} else if (colDiff === 1) {
				mostRecentMove = `h ${$cellSize}`;
				if ((prevRow !== 0 || prevCol !== 0) && !doubleBack)
					prevCenterX -= pathStrokeWidth / 2;
			} else if (colDiff === -1) {
				mostRecentMove = `h -${$cellSize}`;
				if ((prevRow !== 0 || prevCol !== 0) && !doubleBack)
					prevCenterX += pathStrokeWidth / 2;
			}

			animatedPathStr = `M ${prevCenterX} ${prevCenterY} ${mostRecentMove}`;
		}
	};

	const onKeyDown = async (e) => {
		if ($gameState === "post") return;
		if (inProgress.x || inProgress.y) {
			circleX.set(currentCenterX, { duration: 0 });
			circleY.set(currentCenterY, { duration: 0 });
			move(e);
		} else {
			move(e);
		}
	};

	const move = (e) => {
		const current = $data.find(
			(d) => d.row === $location.row && d.col === $location.col
		);
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
<g
	class="path"
	class:faded={playable && ($gameState === "post" || $gameState === "pre")}
>
	{#if playable}
		<circle cx={$circleX} cy={$circleY} r={$cellSize / 4} />
	{/if}
	<path
		class="full"
		d={pathStr}
		style={`--stroke-width: ${pathStrokeWidth}px`}
	/>
	{#key animatedPathStr}
		<path
			class="animated"
			d={animatedPathStr}
			transition:draw={{ duration: dur * 2, easing: quintOut }}
			style={`--stroke-width: ${pathStrokeWidth}px`}
		/>
	{/key}
</g>

<style>
	circle {
		fill: var(--color-pp-magenta);
	}
	path.full {
		stroke: var(--color-pp-magenta);
		stroke-width: var(--stroke-width);
		fill: none;
	}
	path.animated {
		stroke: cornflowerblue;
		/* stroke: var(--color-pp-magenta); */
		stroke-width: var(--stroke-width);
		fill: none;
	}
	g {
		transition: opacity calc(var(--1s) * 0.5) ease-in-out;
	}
	g.faded {
		opacity: 0.05;
	}
</style>
