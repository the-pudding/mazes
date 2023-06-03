<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import data from "$data/iowa.json";
	import _ from "lodash";

	let value;

	const steps = [0, 1, 2, 3, 4];

	const groups = _.chunk(
		_.shuffle(_.flatten(data)),
		Math.ceil(data.length ** 2 / steps.length)
	);
	$: currentWalls = groups.slice(0, value + 1) || [];
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
	<div class="spacer" />

	<Scrolly bind:value>
		{#each steps as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{text}</p>
			</div>
		{/each}
	</Scrolly>
	<div class="spacer" />
</section>

<style>
	.sticky {
		position: sticky;
		width: 60%;
		margin: auto;
		top: 50%;
		transform: translate(0, -50%);
		z-index: -1;
	}
	.spacer {
		height: 75vh;
	}
	.step {
		height: 300px;
		margin: 70vh 0;
		background: var(--color-gray-100);
		text-align: center;
	}
	.step p {
		padding: 1rem;
	}
</style>
