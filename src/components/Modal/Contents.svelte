<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Facts from "$components/Modal/Facts.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import Share from "$components/Modal/Share.svelte";
	import { selectedState, mazeData } from "$stores/misc.js";
	import states from "$data/states.csv";
	import copy from "$data/copy.json";
	import { scaleQuantize, extent } from "d3";

	const { modalNote } = copy;
	const scale = scaleQuantize()
		.domain(extent(states, (d) => +d.score))
		.range([
			"one of the <strong>most complex</strong> states",
			"a <strong>moderately complex</strong> state",
			"one of the <strong>least complex</strong> states"
		]);

	$: stateData = states.find((d) => d.id.toLowerCase() === $selectedState);
	$: name = stateData?.name;
	$: guttmacherLink = stateData?.guttmacher;
	$: score = stateData?.score;
	$: level = scale(score);
	$: wallData = $selectedState ? $mazeData[$selectedState] : [];
</script>

<div class="title">
	<h2>{name}</h2>
	<div>
		...is {@html level} for abortion access.
	</div>
</div>

<div class="play">
	<div class="maze">
		<Maze {wallData} size={wallData.length} playable={true} animated={false} />
	</div>
</div>
<div class="facts">
	<Facts mazeSize={wallData.length} />
</div>

<div class="bottom">
	<div class="left">
		<a href={guttmacherLink} target="_blank"
			>Read more about {name}'s abortion policies
			<span><Icon name="external-link" /></span></a
		>
		<div class="note">
			{@html modalNote}
		</div>
	</div>

	<Share />
</div>

<style>
	.title {
		grid-area: top;
	}
	.facts {
		grid-area: side;
		overflow: scroll;
	}
	.play {
		grid-area: main;
		display: flex;
		justify-content: center;
	}
	.maze {
		width: 100%;
		max-width: 380px;
	}
	.bottom {
		grid-area: bottom;
		color: var(--color-pp-text-gray);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left {
		max-width: 600px;
		margin-right: 3rem;
	}
	.left a {
		color: var(--color-pp-text-gray);
	}
	.left a:hover {
		color: black;
	}
	.left a span {
		font-size: 0.65rem;
	}
	h2 {
		font-weight: 900;
		font-size: 3rem;
		margin-bottom: 0;
	}
	.title div {
		font-size: 1.3rem;
	}
	.note {
		margin-top: 1rem;
	}

	@media (max-width: 600px) {
		.play {
			width: 100%;
			margin-top: 2rem;
		}
		.bottom {
			display: none;
		}
		h2 {
			font-size: 2rem;
		}
		.title div {
			font-size: 1rem;
		}
		.maze {
			max-width: 280px;
		}
	}
</style>
