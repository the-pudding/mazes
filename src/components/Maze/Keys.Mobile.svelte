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
		const current = $data.find(
			(d) => d.row === $location.row && d.col === $location.col
		);
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
	button {
		position: absolute;
		background: var(--color-pp-light-purple);
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		touch-action: manipulation;
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
		transform: translate(-50%, 120%);
	}
	button.left {
		top: 50%;
		left: 0;
		transform: translate(-120%, -50%);
	}
	button.right {
		top: 50%;
		right: 0;
		transform: translate(120%, -50%);
	}

	@media (hover: hover) and (pointer: fine) {
		button {
			touch-action: auto;
		}
	}
</style>
