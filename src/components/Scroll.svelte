<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import data from "$data/iowa.json";
	import copy from "$data/copy.json";
	import scrollY from "$stores/scrollY.js";
	import mq from "$stores/mq.js";
	import _ from "lodash";

	let step;
	let direction = "up";

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
	$: zoom =
		step === steps.length - 1 || (step === undefined && direction === "down");
	$: zoomDuration = $mq.reducedMotion ? 0 : 3000;
	$: step, scrollChange();

	const scrollChange = () => {
		if (step === undefined) {
			if ($scrollY < 3000) direction = "up";
			else direction = "down";
		}
	};
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
		<img src="assets/img/iowa-100.png" class="maze" class:shrunk={zoom} />

		<div class="svg-maze" class:visible={!zoom}>
			<Maze
				wallData={currentWalls}
				size={data.length}
				playable={false}
				animated={true}
			/>
		</div>
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
		width: 60%;
		margin: auto;
		transition: all var(--dur);
	}
	.sticky.zoom {
		width: 90%;
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
		width: 100%;
		transition: none;
		visibility: hidden;
		transform: translate(4%, -87%) scale(0.1);
	}
	.svg-maze.visible {
		transition: all 3s;
		transform: translate(0, -50%);
		visibility: visible;
	}
	.map {
		width: 100%;
		transform: translate(50%, 50%) scale(8);
		opacity: 0;
		transition: all var(--dur);
	}
	.map.visible {
		transform: translate(0, 0);
		opacity: 1;
	}
	.maze {
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		visibility: hidden;
		transition: none;
	}
	img.maze.shrunk {
		transition: all 3s;
		visibility: visible;
		width: 69px;
		top: 57.8%;
		left: 45.9%;
	}

	h1 {
		font-size: 5rem;
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
</style>
