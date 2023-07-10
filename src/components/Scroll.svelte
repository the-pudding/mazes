<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import scrollY from "$stores/scrollY.js";
	import mq from "$stores/mq.js";
	import _ from "lodash";
	import loadMazeData from "$utils/loadMazeData.js";
	import { onMount } from "svelte";
	import { language, scrollStep } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";

	let data;
	let simple;
	let direction = "up";
	let walls;
	let allWallsInPlace = false;

	const featuredState = "il";
	const steps = copy.scroll;

	$: if (
		!allWallsInPlace &&
		($scrollStep >= 6 || ($scrollStep === undefined && direction === "down"))
	)
		enterWalls();
	$: if (allWallsInPlace && $scrollStep < 6) exitWalls();

	const enterWalls = () => {
		setTimeout(() => {
			walls = data;
			allWallsInPlace = true;
		}, 1500);
	};
	const exitWalls = () => {
		walls = simple;
		allWallsInPlace = false;
	};

	$: hed = steps[steps.length - 1][$language];
	$: direction = $scrollY < 3000 ? "up" : "down";
	$: zoomDuration = $mq.reducedMotion ? 0 : 3000;
	$: zoom =
		$scrollStep === steps.length - 1 ||
		($scrollStep === undefined && direction === "down");
	$: $viewport.width, calculateIlPosition();

	let shrinkingMazeEl;
	let mazeEl;
	let labelEl;
	let w;
	let left;
	let top;

	const calculateIlPosition = () => {
		if (mazeEl) {
			let rect = mazeEl.getBoundingClientRect();
			w = rect.width;
			left = rect.left;
			top = rect.top;
		}
	};

	const transitionStart = () => {
		if (!shrinkingMazeEl) return;

		if (!zoom && $scrollStep) {
			shrinkingMazeEl.classList.add("visible");
			const mapIl = document.getElementById("il-intro");
			mapIl.classList.remove("visible");
		}
	};
	const transitionEnd = () => {
		if (!shrinkingMazeEl) return;

		if (zoom && $scrollStep) {
			shrinkingMazeEl.classList.remove("visible");
			const mapIl = document.getElementById("il-intro");
			mapIl.classList.add("visible");
		}
	};

	onMount(async () => {
		simple = await loadMazeData("il-simple");
		data = await loadMazeData(featuredState);
		walls = simple;

		mazeEl = document.querySelector("#il-spot");
		labelEl = document.querySelector("#il-label-spot");
		calculateIlPosition();
	});
</script>

<section id="scrolly">
	<div class="sticky" class:zoom style={`--dur: ${zoomDuration}ms`}>
		<div class="map" class:visible={zoom}>
			<Dashboard type="intro" />
		</div>
		<div class="hidden">
			<Dashboard type="hidden" />
		</div>

		{#if data && data.length}
			<div
				class="illinois"
				class:visible={$scrollStep !== undefined}
				class:shrunk={zoom}
				style={`--w: ${w}px; --left: ${left}px; --top: ${top}px`}
				bind:this={shrinkingMazeEl}
				on:transitionstart={transitionStart}
				on:transitionend={transitionEnd}
			>
				<Maze
					wallData={walls}
					size={Math.sqrt(simple.length)}
					playable={false}
					animated={false}
					intro={true}
				/>
			</div>
		{/if}

		<h1
			class:visible={zoom}
			style={`--delay: ${zoomDuration}ms; --dur: ${zoomDuration / 3}ms`}
		>
			<span>Welcome to the...</span>
			{hed}
		</h1>

		<button
			class="link"
			class:visible={zoom}
			style={`--delay: ${zoomDuration ? zoomDuration - 500 : 0}ms`}
			on:click={() => (location.href = "#dashboard")}
		>
			See all mazes
			<Icon name="arrow-right" />
		</button>
	</div>

	<div class="steps">
		<Scrolly bind:value={$scrollStep}>
			{#each steps as text, i}
				<div class="step">
					<p>{@html text[$language]}</p>
				</div>
			{/each}
		</Scrolly>
		<div class="spacer" />
	</div>
</section>

<style>
	.sticky {
		position: sticky;
		top: 0;
		width: 90%;
		height: 100vh;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transition: all var(--dur);
	}
	.sticky.zoom {
		z-index: 1;
	}
	.steps {
		position: relative;
	}
	.step {
		background: white;
		border: 1px solid var(--color-pp-gray-1);
		box-shadow: 0px 0px 5px rgba(124, 115, 115, 0.1);
		text-align: center;
		max-width: 700px;
		margin: 70vh auto;
	}
	.step:first-of-type {
		margin-top: 10vh;
	}
	.step:last-of-type {
		visibility: hidden;
		margin-bottom: 10vh;
	}
	.step p {
		font-size: 1.2rem;
		line-height: 1.75;
		padding: 1.2rem;
	}
	.spacer {
		height: 75vh;
	}
	.illinois {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 60%;
		max-width: 700px;
		transform: translate(-50%, -50%);
		transition: all calc(var(--dur) * 0.95);
		opacity: 0;
	}
	.illinois.visible {
		opacity: 1;
	}
	.illinois.shrunk {
		top: calc(var(--top) + var(--w) / 2);
		left: calc(var(--left) + var(--w) / 2);
		width: var(--w);
	}
	.map {
		position: absolute;
		top: 50%;
		max-width: min(100%, 900px);
		max-height: calc(100vh - 3rem);
		transform: translate(33.7%, -112.3%) scale(8.1);
		opacity: 0;
		transition: all var(--dur);
	}
	.map.visible {
		transform: translate(0, -50%) scale(1);
		opacity: 1;
	}
	.hidden {
		position: absolute;
		top: 50%;
		max-width: min(100%, 900px);
		max-height: calc(100vh - 3rem);
		transform: translate(0, -50%) scale(1);
		visibility: hidden;
		opacity: 0;
	}
	h1 {
		font-family: var(--font-heavy);
		font-size: 4rem;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		text-align: center;
		background: rgb(249, 247, 244, 0.9);
		color: var(--color-pp-magenta);
		text-transform: uppercase;
		z-index: 1;
		opacity: 0;
		transition: none;
	}
	h1.visible {
		transition: opacity var(--dur) var(--delay);
		opacity: 1;
	}
	h1 span {
		font-size: 1.8rem;
		display: block;
		color: var(--color-pp-text-gray);
		text-transform: none;
		margin: 0.5rem 0 1rem;
	}
	.link {
		position: absolute;
		bottom: 2rem;
		right: 0;
		opacity: 0;
		color: var(--color-pp-text-gray);
		background: none;
		display: flex;
		align-items: center;
	}
	.link.visible {
		transition: opacity calc(var(--1s) * 0.5) var(--delay);
		opacity: 1;
	}
	.link:hover {
		color: var(--color-pp-text-gray-1);
		transform: translateX(0.125rem);
		transition: all 0.2s ease-in;
	}

	@media (max-width: 800px) {
		h1 {
			font-size: 3rem;
		}
	}
	@media (max-width: 600px) {
		h1 {
			font-size: 2rem;
		}
	}
	@media (max-width: 350px) {
		h1 {
			font-size: 1.5rem;
		}
	}
</style>
