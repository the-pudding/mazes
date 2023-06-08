<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";

	const { getGameState } = getContext("maze");
	const gameState = getGameState();
</script>

{#each ["up", "right", "down", "left"] as direction}
	<button class={direction} disabled={$gameState !== "mid"}
		><Icon name={`arrow-${direction}`} /></button
	>
	{#if direction === "up"}
		<div class="text">Tap arrow buttons to navigate</div>
	{/if}
{/each}

<style>
	.text {
		color: var(--color-pp-text-gray);
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
