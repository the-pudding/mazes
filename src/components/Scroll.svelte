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

	let mazeEl;
	let labelEl;
	let w;
	let left;
	let top;

	const calculateIlPosition = () => {
		if (mazeEl) {
			w = mazeEl.offsetWidth;
			left = mazeEl.offsetLeft;
			top = mazeEl.offsetTop;
		}
	};

	onMount(async () => {
		simple = await loadMazeData("il-simple");
		data = await loadMazeData(featuredState);
		walls = simple;

		mazeEl = document.querySelector("#spot-maze");
		labelEl = document.querySelector("#spot-label");
		calculateIlPosition();
	});
</script>

<section id="scrolly">
	<div class="sticky" class:zoom style={`--dur: ${zoomDuration}ms`}>
		<div class="map" class:visible={zoom}>
			<Dashboard interactive={false} />
		</div>

		<div class="illinois">
			{#if data && data.length}
				<div
					class="svg-maze"
					class:shrunk={zoom}
					style={`--w: ${w}px; --left: ${left}px; --top: ${top}px`}
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
		</div>

		<h1
			class:visible={zoom}
			style={`--delay: ${zoomDuration}ms; --dur: ${zoomDuration / 3}ms`}
		>
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
		position: relative;
		max-width: min(100%, 900px);
		max-height: calc(100vh - 3rem);
		width: 100%;
		height: 100%;
	}
	.svg-maze {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 60%;
		max-width: 700px;
		transition: top 2s, left 2s, width 2s, transform 2s, opacity 0.4s;
		opacity: 1;
		transform: translate(-50%, -50%) scale(1);
	}
	.svg-maze.shrunk {
		transform: translate(0, 0) scale(1);
		top: var(--top);
		left: var(--left);
		width: var(--w);
		height: var(--h);
		opacity: 0;
	}
	.map {
		position: absolute;
		top: 50%;
		max-width: min(100%, 900px);
		max-height: calc(100vh - 3rem);
		transform: translate(33.7%, -112.3%) scale(8.1);
		/* transform: translate(35%, -41%) scale(8); */
		opacity: 0;
		transition: all var(--dur);
	}
	.map.visible {
		transform: translate(0, -50%) scale(1);
		opacity: 1;
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
	.maze {
		position: absolute;
		top: 50%;
		width: 100%;
		max-width: 700px;
		transform: translate(0, -50%) scale(1);
		width: 60%;
		visibility: hidden;
		transition: all 3s;
	}
	.maze.shrunk {
		visibility: visible;
		transform: translate(-7%, -39.7%) scale(0.118);
	}
	.label {
		color: var(--color-pp-text-gray);
		position: absolute;
		top: -34%;
		font-size: 170px;
		height: 300px;
		z-index: 10000;
		left: 50%;
		transform: translate(-50%, 0);
		opacity: 0;
		transition: none;
	}
	.label.visible {
		transition: opacity calc(var(--1s) * 0.5) var(--delay);
		opacity: 1;
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
