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
				<span class="icon">{@html checkIcon}</span>
				<span class="text">Maze completed!</span>
			</div>
		{/if}
		{#if stateName == "District Of Columbia"}
			<p>Read more about the 
				<a href={guttmacherLink} target="_blank" class="link">District of Columbia's</a>
			abortion policies</p>
		{:else}
			<p>Read more about
				<a href={guttmacherLink} target="_blank" class="link">{stateName}'s</a>
			abortion policies</p>
		{/if}
		<button class="link link-sm" on:click={() => ($selectedState = undefined)}
			>Return to all mazes</button
		>
	{/if}

	{#if mobile && $gameState !== "pre"}
		<button class="reset" on:click={reset}>restart</button>
		<button class="solve" on:click={solve}>Complete</button>
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
		transition: opacity calc(var(--1s) * 0.3);
	}
	.overlay.visible {
		opacity: 1;
	}
	.overlay p {
		text-align: center;
	}
	.icon {
		display: flex;
		height: 50px;
		width: 50px;
		border-radius: 50%;
		background-color: var(--color-bg);
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
		border: 1px solid var(--color-tan);
		color: var(--color-dark-tan);
		font-size: 0.8rem;
	}
	button.reset {
		top: 0;
		left: 0;
		transform: translate(0, -120%);
		background: var(--color-accent-orange);
		border: none;
		color: var(--color-bg);
		font-weight: 700;
		text-transform: uppercase;
	}
	button.solve {
		bottom: 0;
		right: 0;
		transform: translate(0, 120%);
	}
	button.reset:hover {
		transform: translate(0, -123%);
	}
	button.solve:hover {
		transform: translate(0, 117%);
	}
	button.start:hover {
		transform: translate(0, -2px);
	}
	.complete {
		font-size: var(--28px);
		font-weight: bold;
		text-align: center;
		display: flex;
		flex-direction: column;
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
	.link-sm {
		font-size: var(--14px);
	}
	.link:hover {
		color: var(--color-dark-tan);
	}

	@media (max-width: 700px) {
		.link-sm {
			font-size: var(--12px);
		}
		.icon {
			height: 36px;
			width: 36px;
		}
	}
</style>
