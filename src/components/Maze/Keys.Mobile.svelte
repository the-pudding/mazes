<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";

	const { getData, getGameState, getAvailableWidth, getPath, getLocation } =
		getContext("maze");
	const data = getData();
	const gameState = getGameState();
	const availableWidth = getAvailableWidth();
	const path = getPath();
	const location = getLocation();

	const move = (direction) => {
		const current = $data[$location.row][$location.col];
		const [top, right, bottom, left] = current.walls;

		const validLeft = direction === "left" && !left;
		const validRight = direction === "right" && !right;
		const validUp = direction === "up" && !top;
		const validDown = direction === "down" && !bottom;

		if (validLeft || validRight || validUp || validDown) {
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

<div
	class="mobile-controls"
	style:width={`${$availableWidth}px`}
	style:height={`${$availableWidth}px`}
	class:active={$gameState === "mid"}
>
	{#each ["up", "right", "down", "left"] as direction}
		<button
			class={direction}
			disabled={$gameState !== "mid"}
			on:click={() => move(direction)}
			><Icon name={`arrow-${direction}`} /></button
		>
		{#if direction === "up"}
			<div class="text">Tap arrow buttons to navigate</div>
		{/if}
	{/each}
</div>

<style>
	.mobile-controls {
		position: absolute;
		top: 0;
		pointer-events: none;
	}
	.active {
		pointer-events: auto;
	}
	.text {
		color: var(--color-pp-dark);
		font-size: 0.7rem;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(1.6rem, -100%);
		text-align: start;
	}
	button {
		position: absolute;
		background: var(--color-pp-gray-1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
	}
	button.up {
		top: 0;
		left: 50%;
		transform: translate(-50%, -120%);
		display: flex;
		align-items: center;
	}
	button.down {
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 20%);
	}
	button.left {
		top: 50%;
		left: 0;
		transform: translate(-70%, -50%);
	}
	button.right {
		top: 50%;
		right: 0;
		transform: translate(70%, -50%);
	}
</style>
