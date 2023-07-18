<script>
	import KeysDesktop from "$components/Maze/Keys.Desktop.svelte";
	import KeysMobile from "$components/Maze/Keys.Mobile.svelte";
	import Button from "$components/Button.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";
	import mq from "$stores/mq.js";
	import viewport from "$stores/viewport.js";
	import { selectedState } from "$stores/misc.js";
	import { fade } from "svelte/transition";
	import _ from "lodash";

	export let loading;

	const { getGameState, getWidth, getLocation, getDims, getPath, getData } =
		getContext("maze");
	const gameState = getGameState();
	const width = getWidth();
	const location = getLocation();
	const dims = getDims();
	const path = getPath();
	const data = getData();

	const start = () => {
		$gameState = "mid";
	};
	const reset = () => {
		$gameState = "mid";
		$location = { row: 0, col: 0 };
	};
	const solve = async () => {
		const solution = _.orderBy(
			$data.filter((d) => d.solutionIndex !== null),
			"solutionIndex",
			"asc"
		);
		$path = solution;
		$gameState = "post";
		$location = { row: $dims - 1, col: $dims - 1 };

		await tick();
		const readMoreLink = document.getElementById("read-more");
		readMoreLink.focus();
	};

	$: mobile = $viewport.width < 600;
	$: stateData = states.find((d) => d.id === $selectedState);
	$: name = _.startCase(stateData?.name);
	$: guttmacherLink = stateData?.guttmacher;
	$: visible = mobile || $gameState === "pre" || $gameState === "post";
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
			<div
				transition:fade={{ duration: $mq.reducedMotion ? 0 : 500 }}
				style="display: flex; flex-direction: column; align-items: center"
			>
				<Button
					text={"start maze"}
					onClick={start}
					style={"z-index: 11; margin-bottom: 1rem"}
				/>
				{#if mobile}
					<div class="instructions">Tap arrow buttons to navigate</div>
				{:else}
					<KeysDesktop background={true} />
				{/if}
			</div>
		{/if}
	{:else if $gameState === "post"}
		<p class="text">Maze completed!</p>
		<p class="text small">
			<a href={guttmacherLink} target="_blank" id="read-more"
				>Read more about {name}'s abortion policies
				<span><Icon name="external-link" /></span></a
			>
		</p>
	{/if}

	{#if mobile}
		<div class="restart">
			<button disabled={$gameState === "pre"} on:click={reset}>
				<Icon name="refresh-cw" />
			</button>
			<div class="label">Restart</div>
		</div>

		<div class="solve">
			<div class="label">Complete</div>
			<button disabled={$gameState === "pre"} on:click={solve}>
				<Icon name="check-circle" />
			</button>
		</div>
	{/if}

	{#if mobile}
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
		justify-content: center;
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
		font-family: var(--font-bold);
	}
	.small {
		font-size: 1.2rem;
		max-width: 300px;
		font-family: var(--sans);
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
	button {
		border-radius: 100%;
		background: #f9f7f4;
		color: var(--color-pp-gray-3);
		font-size: 0.9rem;
	}
	.restart,
	.solve {
		position: absolute;
		display: flex;
		align-items: center;
	}
	.restart {
		left: 0;
		top: 0;
		transform: translate(0, calc(-100% - 4px));
	}
	.solve {
		bottom: 0;
		right: 0;
		transform: translate(0, calc(100% + 4px));
	}
	.label {
		font-family: var(--sans);
		font-size: 0.7rem;
		color: var(--color-pp-text-gray);
	}
	.restart .label {
		margin-left: 4px;
	}
	.solve .label {
		margin-right: 4px;
	}
	.instructions {
		color: var(--color-pp-dark);
		font-size: 0.9rem;
		text-align: center;
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
