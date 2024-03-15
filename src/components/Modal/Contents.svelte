<script>
	import Maze from "$components/Maze/Maze.svelte";
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
	let height;
	$: availableSpace = Math.min(height, width);
	let loading = false;

	const { modalNote } = copy;
	const scale = scaleQuantize()
		.domain(
			extent(
				states.filter((d) => d.ban === "false"),
				(d) => +d.score
			)
		)
		.range([
			"one of the <strong>most complex</strong> states",
			"a <strong>very complex</strong> state",
			"a <strong>moderately complex</strong> state",
			"a <strong>somewhat complex</strong> state",
			"one of the <strong>least complex</strong> states"
		]);

	$: mobile = $viewport.width < 600;
	$: stateData = states.find((d) => d.id === $selectedState);
	$: ban = stateData?.ban === "true";
	$: name =
		$viewport.width < 800 && $selectedState === "dc"
			? "D.C."
			: _.startCase(stateData?.name);
	$: guttmacherLink = stateData?.guttmacher;
	$: score = stateData?.score;
	$: level = scale(score);
	$: numCells = data && data.length ? Math.sqrt(data.length) : 0;
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
		<span>{name}</span>
		<Share />
	</h2>
	{#if !ban}
		<div>
			...is {@html level} for abortion access.
		</div>
	{/if}
</div>

<div class="maze" bind:clientWidth={width} bind:clientHeight={height}>
	{#key $selectedState}
		<Maze
			{availableSpace}
			wallData={data}
			{numCells}
			playable={true}
			animated={false}
			{loading}
		/>
	{/key}
</div>

{#if !mobile}
	<div class="bottom">
		{@html modalNote[$language]}
	</div>
{/if}

<style>
	.maze {
		position: relative;
		flex: 1;
		width: 100%;
		margin: 2rem auto;
	}
	.bottom {
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
		display: flex;
		align-items: center;
	}
	.title div {
		font-size: 1.3rem;
	}
	.white-box {
		background: rgb(255, 255, 255, 0.95);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}
	.white-box {
		text-align: center;
		font-size: 1.2rem;
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
	img.wi {
		position: absolute;
		top: 0;
		width: 100%;
		z-index: -1;
	}

	@media (max-width: 800px) {
		h2 {
			font-size: 2.5rem;
		}
	}
	@media (max-width: 600px) {
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
	}
	@media (max-width: 400px) {
		h2 {
			font-size: 1.5rem;
		}
	}
</style>
