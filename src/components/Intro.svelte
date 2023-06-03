<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import { scaleLinear } from "d3";

	let value;

	const steps = [0, 1, 2, 3, 4];

	const wallsScale = scaleLinear()
		.domain([0, steps.length - 1])
		.range([0, 100]);
	$: percentOfWallsShowing = wallsScale(value) || 0;
</script>

<section id="scrolly">
	<div class="sticky">
		<Maze playable={false} {percentOfWallsShowing} />
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
