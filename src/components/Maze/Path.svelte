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
	const dur = 100;
	const circleX = tweened(($cellSize + $wallWidth) / 2);
	const circleY = tweened(($cellSize + $wallWidth) / 2);

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

	$: $path, $cellSize, $wallWidth, updatePath();
	const updatePath = () => {
		pathStr = $path
			.slice(0, $gameState === "post" ? $path.length : $path.length - 1)
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
<g class="path">
	<circle cx={$circleX} cy={$circleY} r={$cellSize / 4} />

	<path
		class="full"
		d={pathStr}
		style={`--stroke-width: ${pathStrokeWidth}px`}
	/>

	{#key animatedPathStr}
		<path
			class="animated"
			d={animatedPathStr}
			in:draw={{ duration: dur * 2, easing: quintOut }}
			style={`--stroke-width: ${pathStrokeWidth}px`}
		/>
	{/key}
</g>

<style>
	circle {
		fill: var(--color-accent-purple);
	}
	path.full {
		stroke: var(--color-accent-purple);
		stroke-width: var(--stroke-width);
		fill: none;
	}
	path.animated {
		stroke: var(--color-accent-purple);
		stroke-width: var(--stroke-width);
		fill: none;
	}
</style>
