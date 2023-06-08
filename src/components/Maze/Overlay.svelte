<script>
	import KeysDesktop from "$components/Maze/Keys.Desktop.svelte";
	import KeysMobile from "$components/Maze/Keys.Mobile.svelte";
	import Button from "$components/Button.svelte";
	import { getContext } from "svelte";
	import mq from "$stores/mq.js";

	const { getGameState, getWidth } = getContext("maze");
	const gameState = getGameState();
	const width = getWidth();

	const start = () => {
		$gameState = "mid";
	};
</script>

<div class="overlay" style:height={`${$width}px`} class:visible={true}>
	{#if $gameState === "pre"}
		<Button text={"start maze"} onClick={start} style={"z-index: 11"} />
		{#if $mq.desktop}
			<KeysDesktop />
		{/if}
	{:else if $gameState === "post"}
		<div class="text">Maze completed!</div>
		<div class="text">Take action tk</div>
	{/if}

	{#if !$mq.desktop}
		<KeysMobile />
	{/if}
</div>

<style>
	.overlay {
		position: absolute;
		top: 0;
		width: 100%;
		padding: 3rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		visibility: hidden;
		font-size: 1.6rem;
		z-index: 10;
	}
	.visible {
		visibility: visible;
	}
	.text {
		text-align: center;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text);
	}
	@media (max-width: 600px) {
		.overlay {
			font-size: 1.2rem;
		}
	}
</style>
