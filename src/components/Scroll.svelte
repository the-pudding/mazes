<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import data from "$data/iowa.json";
	import copy from "$data/copy.json";
	import _ from "lodash";

	let step;

	const steps = copy.scroll;

	const groups = _.chunk(
		_.shuffle(_.flatten(data)),
		Math.ceil(data.length ** 2 / steps.length)
	);
	$: currentWalls = groups.slice(0, step + 1) || [];
</script>

<section id="scrolly">
	<div class="sticky">
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
	.step p {
		font-size: 1.2rem;
		padding: 1.2rem;
	}
	.spacer {
		height: 75vh;
	}
</style>
