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
	import viewport from "$stores/viewport.js";

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

	$: mobile = $viewport.width < 600;
	$: stateData = states.find((d) => d.id === $selectedState);
	$: ban = stateData?.ban === "true";
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
	<h2>
		{name}

		<Share />
	</h2>
	{#if !ban}
		<div>
			...is {@html level} for abortion access.
		</div>
	{/if}
</div>

<div class="play">
	<div class="maze" bind:clientWidth={width}>
		{#key $selectedState}
			{#if ban}
				<div
					class="black-box"
					style:width={`${width}px`}
					style:height={`${width}px`}
				>
					<p>{@html copy.totalBanNote[$language]}</p>
					<p>
						<a href={guttmacherLink} target="_blank"
							>Read more about {name}'s abortion policies
							<span><Icon name="external-link" /></span></a
						>
					</p>
				</div>
			{:else}
				<Maze
					wallData={data}
					{size}
					playable={true}
					animated={false}
					{loading}
				/>
			{/if}
		{/key}
	</div>
</div>
<div class="facts">
	<Facts {ban} />
</div>

{#if !mobile}
	<div class="bottom">
		{@html modalNote[$language]}
	</div>
{/if}

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
		max-width: 359px;
		position: relative;
	}
	.bottom {
		grid-area: bottom;
		color: var(--color-pp-text-gray);
		display: flex;
		align-items: end;
		justify-content: space-between;
		font-size: 0.8rem;
	}
	h2 {
		font-family: var(--font-heavy);
		font-weight: 900;
		font-size: 3rem;
		margin-bottom: 0;
	}
	.title div {
		font-size: 1.3rem;
	}
	.black-box {
		background: black;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}
	.black-box p {
		color: white;
		text-align: center;
		font-size: 1.2rem;
	}
	.black-box a {
		color: white;
	}
	.black-box a:hover {
		color: var(--color-pp-gray-1);
	}
	.black-box a span {
		font-size: 0.65rem;
	}

	@media (max-width: 600px) {
		.play {
			width: 100%;
			margin-top: 2rem;
		}
		h2 {
			font-size: 2rem;
			margin: 0;
		}
		.title div {
			font-size: 1rem;
		}
		.maze {
			max-width: 80%;
		}
		.facts {
			padding: 0;
			margin-top: 1.5rem;
		}
	}
</style>
