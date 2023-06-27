<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Facts from "$components/Modal/Facts.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import Share from "$components/Modal/Share.svelte";
	import loadMazeData from "$utils/loadMazeData.js";
	import { language, selectedState } from "$stores/misc.js";
	import states from "$data/states.csv";
	import copy from "$data/copy.json";
	import _ from "lodash";
	import { scaleQuantize, extent } from "d3";
	import { tick } from "svelte";

	let data;
	let width;
	let loading = false;

	const { modalNote } = copy;
	const scale = scaleQuantize()
		.domain(extent(states, (d) => +d.score))
		.range([
			"one of the <strong>most complex</strong> states",
			"a <strong>moderately complex</strong> state",
			"one of the <strong>least complex</strong> states"
		]);

	$: stateData = states.find((d) => d.id === $selectedState);
	$: name = _.startCase(stateData?.name);
	$: guttmacherLink = stateData?.guttmacher;
	$: score = stateData?.score;
	$: level = scale(score);
	$: size = data && data.length ? Math.sqrt(data.length) : 0;
	$: if ($selectedState) getMazeData();

	const getMazeData = async () => {
		loading = true;
		data = await loadMazeData($selectedState);
		await tick();
		loading = false;
	};
</script>

<div class="title">
	<h2>{name}</h2>
	<div>
		...is {@html level} for abortion access.
	</div>
</div>

<div class="play">
	<div class="maze" bind:clientWidth={width}>
		{#key $selectedState}
			<Maze wallData={data} {size} playable={true} animated={false} {loading} />
		{/key}
	</div>
</div>
<div class="facts">
	<Facts mazeSize={size} />
</div>

<div class="bottom">
	<div class="left">
		<a href={guttmacherLink} target="_blank"
			>Read more about {name}'s abortion policies
			<span><Icon name="external-link" /></span></a
		>
		<div class="note">
			{@html modalNote[$language]}
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
		margin-top: -0.5rem;
		padding-top: 1rem;
	}
	.play {
		grid-area: main;
		display: flex;
		justify-content: center;
	}
	.maze {
		width: 100%;
		max-width: 380px;
		position: relative;
	}
	.bottom {
		grid-area: bottom;
		color: var(--color-pp-text-gray);
		display: flex;
		align-items: end;
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
		font-family: var(--font-heavy);
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
