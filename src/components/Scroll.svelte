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
	<img
		src="assets/img/usa-missing.png"
		alt="map of mazes for each state in the usa"
		class:visible={zoom}
		style={`--dur: ${zoomDuration}ms`}
	/>
	<h1
		class:visible={zoom}
		style={`--delay: ${zoomDuration}ms; --dur: ${zoomDuration / 3}ms`}
	>
		{title}
	</h1>

	<div class="sticky" class:shrunk={zoom} style={`--dur: ${zoomDuration}ms`}>
		<Maze
			wallData={currentWalls}
			size={data.length}
			playable={false}
			animated={true}
		/>
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
		width: 60%;
		margin: auto;
		top: 50%;
		transform: translate(0, -50%);
		transition: transform var(--dur);
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
	img {
		position: sticky;
		top: 50%;
		width: 90%;
		margin: auto;
		transform: translate(240px, -632px) scale(8);
		opacity: 0;
		transition: all var(--dur);
	}
	img.visible {
		transform: translate(0, -50%);
		opacity: 1;
	}
	.shrunk {
		transform: translate(-32px, -207px) scale(0.105);
	}
	h1 {
		font-size: 5rem;
		position: sticky;
		top: 50%;
		transform: translate(0, -50%);
		text-align: center;
		background: var(--upper-bg);
		color: var(--color-pp-magenta);
		font-weight: 900;
		text-transform: uppercase;
		z-index: 1;
		opacity: 0;
		transition: opacity var(--dur) var(--delay);
	}
	h1.visible {
		opacity: 1;
	}
</style>
