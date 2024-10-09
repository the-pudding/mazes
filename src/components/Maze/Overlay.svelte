<script>
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import checkIcon from "$svg/check-orange.svg";

	const { getMazeSize, getGameState, getUserSolved } = getContext("maze");

	const mazeSize = getMazeSize();
	const gameState = getGameState();
	const userSolved = getUserSolved();
</script>

<div
	class="overlay"
	style:height={`${$mazeSize}px`}
	class:visible={$gameState === "post"}
>
	{#if $userSolved}<span class="icon">{@html checkIcon}</span>{/if}
	<button class="return" on:click={() => ($selectedState = undefined)}
		>Return to full map</button
	>
</div>

<style>
	.overlay {
		width: 100%;
		position: absolute;
		top: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.overlay.visible {
		opacity: 1;
	}
	.icon {
		display: flex;
		height: 40px;
		width: 40px;
	}
	button.return {
		background: none;
		color: var(--color-fg);
		padding: 0;
		margin: 0.5rem 0;
		font-weight: bold;
		font-size: 1.6rem;
		text-align: center;
	}
	.bounce {
		animation: bounce 0.7s ease-in-out infinite;
	}
	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-5px);
		}
		100% {
			transform: translateY(0);
		}
	}

	@media (max-width: 600px) {
		button.return {
			font-size: 1.4rem;
		}
	}
</style>
