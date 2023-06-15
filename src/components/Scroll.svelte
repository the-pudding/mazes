<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import scrollY from "$stores/scrollY.js";
	import mq from "$stores/mq.js";
	import _ from "lodash";
	import data from "$data/states/il.json";

	let step;
	let direction = "up";

	const featuredState = "il";
	const title = copy.title;
	const steps = copy.scroll;
	const groups = _.chunk(
		_.shuffle(_.flatten(data)),
		Math.ceil(data.length ** 2 / (steps.length - 1))
	);

	$: currentWalls =
		step === undefined && direction === "up"
			? []
			: step === undefined && direction === "down"
			? groups
			: groups.slice(0, step + 1);
	$: direction = $scrollY < 3000 ? "up" : "down";
	$: zoom =
		step === steps.length - 1 || (step === undefined && direction === "down");
	$: zoomDuration = $mq.reducedMotion ? 0 : 3000;
</script>

<section id="scrolly">
	<div class="sticky" class:zoom style={`--dur: ${zoomDuration}ms`}>
		<h1
			class:visible={zoom}
			style={`--delay: ${zoomDuration}ms; --dur: ${zoomDuration / 3}ms`}
		>
			{title}
		</h1>
		<img
			src="assets/img/usa-missing.png"
			alt="map of mazes for each state in the usa"
			class="map"
			class:visible={zoom}
			style={`--dur: ${zoomDuration}ms`}
		/>

		<div
			class="label"
			class:visible={zoom}
			style={`--delay: ${zoomDuration ? zoomDuration - 500 : 0}ms`}
		>
			IL
		</div>
		<img
			src={`assets/img/states/${featuredState}.png`}
			class="maze"
			class:shrunk={zoom}
			alt={`maze for ${featuredState}`}
		/>

		<div class="svg-maze" class:visible={!zoom}>
			<Maze
				wallData={currentWalls}
				size={data.length}
				playable={false}
				animated={true}
			/>
		</div>

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
		<Scrolly bind:value={step}>
			{#each steps as { value }, i}
				{@const active = value === i}
				<div class="step" class:active>
					<p>{@html value}</p>
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
		padding: 1.2rem;
	}
	.spacer {
		height: 75vh;
	}
	.svg-maze {
		position: absolute;
		top: 50%;
		width: 60%;
		max-width: 700px;
		transition: none;
		visibility: hidden;
		transform: translate(-7%, -39.7%) scale(0.118);
	}
	.svg-maze.visible {
		transition: all 3s;
		visibility: visible;
		transform: translate(0, -50%);
	}
	.map {
		position: absolute;
		width: 100%;
		transform: translate(35%, -41%) scale(8);
		opacity: 0;
		transition: all var(--dur);
	}
	.map.visible {
		transform: translate(0, 0) scale(1);
		opacity: 1;
	}
	h1 {
		font-size: 4rem;
		position: absolute;
		top: 50%;
		transform: translate(0, -50%);
		text-align: center;
		background: var(--upper-bg);
		color: var(--color-pp-magenta);
		font-weight: 900;
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
		top: 50.4%;
		left: 45.4%;
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
