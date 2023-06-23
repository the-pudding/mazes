<script>
	import KeysDesktop from "$components/Maze/Keys.Desktop.svelte";
	import KeysMobile from "$components/Maze/Keys.Mobile.svelte";
	import Button from "$components/Button.svelte";
	import { getContext } from "svelte";
	import mq from "$stores/mq.js";
	import { fade } from "svelte/transition";

	export let loading;

	const { getGameState, getWidth } = getContext("maze");
	const gameState = getGameState();
	const width = getWidth();

	const start = () => {
		$gameState = "mid";
	};

	$: visible = $gameState === "pre" || $gameState === "post";
</script>

<div class="overlay" style:height={`${$width}px`} class:visible>
	{#if $gameState === "pre"}
		{#if loading}
			<svg width={$width} height={$width}>
				<path
					d="M 0 0 L {$width} 0 L {$width} {$width} L 0 {$width} Z"
					fill="none"
					stroke="var(--color-pp-text-gray)"
					stroke-width={10}
					style={`--offset: ${$width * 4}`}
				/>
			</svg>
			<div class="loading-text">Loading...</div>
		{:else}
			<div transition:fade={{ duration: $mq.reducedMotion ? 0 : 500 }}>
				<Button
					text={"start maze"}
					onClick={start}
					style={"z-index: 11; margin-bottom: 1rem"}
				/>
				{#if $mq.desktop}
					<KeysDesktop background={true} />
				{/if}
			</div>
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
		font-size: 1.6rem;
		z-index: 10;
		opacity: 0;
		transition: opacity calc(var(--1s) * 1) calc(var(--1s) * 0.2) ease-in-out;
	}
	.visible {
		opacity: 1;
	}
	.text {
		text-align: center;
		font-size: 2rem;
		color: var(--color-text);
	}
	.loading-text {
		color: var(--color-pp-text-gray);
		font-size: 0.8rem;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
	}
	svg {
		position: absolute;
		top: 0;
	}
	path {
		opacity: 0.25;
		stroke-dasharray: var(--offset);
		stroke-dashoffset: var(--offset);
		animation: dash calc(var(--1s) * 4) infinite linear;
	}
	@keyframes dash {
		to {
			stroke-dashoffset: 0;
		}
	}

	@media (max-width: 600px) {
		.overlay {
			font-size: 1.2rem;
		}
	}
</style>
