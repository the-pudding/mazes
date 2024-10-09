<script>
	import stateData from "$data/states.csv";
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import checkIcon from "$svg/check-orange.svg";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";

	export let start;
	export let reset;
	export let solve;

	const { getMazeSize, getGameState, getUserSolved } = getContext("maze");
	const mazeSize = getMazeSize();
	const gameState = getGameState();
	const userSolved = getUserSolved();

	$: mobile = $viewport.width < 600;
	$: state = stateData.find((d) => d.id === $selectedState);
	$: stateName = state ? _.startCase(state.name) : "";
	$: guttmacherLink = state?.guttmacher;
</script>

<div
	class="overlay"
	style:height={`${$mazeSize}px`}
	class:visible={mobile || $gameState === "post"}
>
	{#if $gameState === "pre"}
		<button class="start" on:click={start}>start maze</button>
		<div class="instruction">Tap arrow buttons to navigate</div>
	{:else if $gameState === "post"}
		{#if $userSolved}
			<div class="complete">
				Maze completed!
				<span class="icon">{@html checkIcon}</span>
			</div>
		{/if}
		<a href={guttmacherLink} target="_blank" class="link"
			>Read more about {stateName}'s abortion policies</a
		>
		<button class="link" on:click={() => ($selectedState = undefined)}
			>Return to full map</button
		>
	{/if}

	{#if mobile && $gameState !== "pre"}
		<button class="reset" on:click={reset}>restart</button>
		<button class="solve" on:click={solve}>complete</button>
	{/if}
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
		height: 32px;
		width: 32px;
	}
	.instruction {
		margin-top: 0.5rem;
		font-size: 0.9rem;
	}
	button.start {
		font-size: 1.2rem;
		color: white;
		background: var(--color-accent-orange);
		text-transform: uppercase;
		font-weight: bold;
		font-family: var(--mono);
		padding: 0.9rem 0.75rem;
	}
	button.reset,
	button.solve {
		position: absolute;
		background: none;
		border: 1px solid var(--color-dark-tan);
		color: var(--color-dark-tan);
		text-transform: uppercase;
		font-size: 0.8rem;
	}
	button.reset {
		top: 0;
		left: 0;
		transform: translate(0, -120%);
	}
	button.solve {
		bottom: 0;
		right: 0;
		transform: translate(0, 120%);
	}
	.complete {
		font-size: 1.6rem;
		font-weight: bold;
		text-align: center;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	.link {
		background: none;
		color: var(--color-fg);
		padding: 0;
		margin: 0.5rem 0;
		font-weight: bold;
		font-size: 1.1rem;
		text-align: center;
		text-decoration: underline;
		border-bottom: none;
	}
	.link:hover {
		color: var(--color-dark-tan);
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
		.link {
			font-size: 1rem;
		}
		.complete {
			font-size: 1.5rem;
		}
		.icon {
			height: 20px;
			width: 20px;
		}
	}
</style>
