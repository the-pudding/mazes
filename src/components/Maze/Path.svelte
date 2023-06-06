<script>
	import { getContext } from "svelte";
	import mq from "$stores/mq.js";
	import { tweened } from "svelte/motion";
	import { draw } from "svelte/transition";
	import { quintOut } from "svelte/easing";

	const { getData, getCellSize, getLocation, getWallWidth } =
		getContext("maze");
	const data = getData();
	const cellSize = getCellSize();
	const location = getLocation();
	const wallWidth = getWallWidth();

	const dur = 200;
	let inProgress = { x: false, y: false };
	const circleX = tweened(($cellSize + $wallWidth) / 2, {
		duration: $mq.reducedMotion ? 0 : dur
	});
	const circleY = tweened(($cellSize + $wallWidth) / 2, {
		duration: $mq.reducedMotion ? 0 : dur
	});

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
	$: pathStr = `M ${($cellSize + $wallWidth) / 2} ${
		($cellSize + $wallWidth) / 2
	}`;

	let animatedPathStr;
	let mostRecentMove;

	const onKeyDown = (e) => {
		if (inProgress.x || inProgress.y) return;

		const current = $data[$location.row][$location.col];
		const [top, right, bottom, left] = current.walls;

		const validLeft = e.keyCode === 37 && !left;
		const validRight = e.keyCode === 39 && !right;
		const validUp = e.keyCode === 38 && !top;
		const validDown = e.keyCode === 40 && !bottom;

		if (validLeft || validRight || validUp || validDown) {
			animatedPathStr = `M ${currentCenterX} ${currentCenterY}`;
			inProgress = { x: true, y: true };
			if (mostRecentMove) pathStr += ` ${mostRecentMove}`;

			if (validLeft) {
				$location = { row: $location.row, col: $location.col - 1 };
				mostRecentMove = `l -${$cellSize} 0`;
			} else if (validUp) {
				$location = { row: $location.row - 1, col: $location.col };
				mostRecentMove = `l 0 -${$cellSize}`;
			} else if (validRight) {
				$location = { row: $location.row, col: $location.col + 1 };
				mostRecentMove = `l ${$cellSize} 0`;
			} else if (validDown) {
				$location = { row: $location.row + 1, col: $location.col };
				mostRecentMove = `l 0 ${$cellSize}`;
			}

			animatedPathStr += ` ${mostRecentMove}`;
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} />
<g class="path">
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
</style>
