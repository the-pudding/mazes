<script>
	import Info from "$components/Modal/Info.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import loadMazeData from "$utils/loadMazeData.js";
	import stateData from "$data/states.csv";
	import { selectedState } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";
	import { tick } from "svelte";
	import Icon from "$components/helpers/Icon.svelte";

	export let sentences;

	let data;
	let width;
	let height;
	let loading = false;

	$: availableSpace = Math.min(height, width);
	$: numCells = data && data.length ? Math.sqrt(data.length) : 0;
	$: if ($selectedState) getMazeData();
	$: mobile = $viewport.width < 700;
	$: state = stateData.find((d) => d.id === $selectedState);
	$: guttmacherLink = state?.guttmacher;

	let t;
	let copySuccess = false;

	const getMazeData = async () => {
		loading = true;
		data = await loadMazeData($selectedState);
		await tick();
		loading = false;
	};

	const share = () => {
		const baseUrl = window.location.origin + window.location.pathname;
		const shareUrl = `${baseUrl}?state=${encodeURIComponent($selectedState)}`;

		navigator.clipboard
			.writeText(shareUrl)
			.then(() => {
				clearTimeout(t);
				copySuccess = true;

				t = setTimeout(() => {
					copySuccess = false;
				}, 2000);
			})
			.catch((err) => {});
	};
</script>

<div class="contents">
	<div class="top-wrapper">
		<div class="info">
			{#if $selectedState}
				<Info {sentences} />
			{/if}
		</div>
		<div class="maze" bind:clientWidth={width} bind:clientHeight={height}>
			{#if $selectedState}
				<Maze
					{availableSpace}
					wallData={data}
					{numCells}
					animated={false}
					{loading}
				/>
			{/if}
		</div>
	</div>
	{#if !mobile}
		<div class="learn">
			<span>Learn more about this</span>
			<a href={guttmacherLink} target="_blank">state’s abortion policies</a>
			and
			<span class="share">
				<a href="#" on:click|preventDefault={share}>share this state’s maze</a>
				<span class="icon"><Icon name="share" /></span>
				<span class="clipboard" class:visible={copySuccess}>Link copied!</span>
			</span>
		</div>
	{/if}
</div>

<style>
	.contents {
		display: flex;
		width: 100%;
		flex-direction: column;
		height: 100%;
		gap: 3rem;
	}
	.top-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}
	.info {
		width: calc(50% - 1rem);
	}
	.maze {
		width: calc(50% - 1rem);
		display: flex;
		align-items: start;
		margin-top: 4rem;
		justify-content: center;
		aspect-ratio: 1 / 1.25;
	}

	.learn {
		display: flex;
		flex-wrap: wrap;
		gap: 0 4px;
		align-items: baseline;
		color: var(--color-dark-tan);
		font-size: 0.9rem;
		width: 100%;
		z-index: 1000;
	}
	.share {
		display: flex;
		align-items: center;
		position: relative;
	}
	.share .icon {
		display: flex;
		height: 20px;
		width: 20px;
		margin-left: 6px;
	}

	:global(
			.share:hover .icon svg path,
			.share:hover .icon svg polyline,
			.share:hover .icon svg line
		) {
		stroke: var(--color-fg);
	}

	.clipboard {
		font-size: var(--12px);
		font-family: var(--sans);
		font-weight: 600;
		position: absolute;
		top: 0;
		left: 50%;
		width: 100px;
		opacity: 0;
		transform: translate(-52.75%, 0);
		z-index: -1000;
		text-align: center;
		background: var(--color-bg);
		border: 1px solid var(--color-dark-tan);
		color: var(--color-fg);
		padding: 0.25rem;
		border-radius: 3px;
		transition: transform calc(var(--1s) * 0.3), opacity calc(var(--1s) * 0.15);
	}
	.clipboard.visible {
		transform: translate(-52.75%, -120%);
		opacity: 1;
	}

	@media (max-width: 700px) {
		.contents {
			align-items: center;
		}
		.top-wrapper {
			flex-direction: column;
			align-items: center;
		}
		.info,
		.maze {
			width: 100%;
		}
		.maze {
			margin-top: 1rem;
			align-items: center;
		}
	}

	@media (max-width: 600px) {
		.contents {
			flex-direction: column;
			align-items: center;
			gap: 1rem;
		}
		.info,
		.maze {
			width: 100%;
		}
		.maze {
			flex: 1;
			max-width: 80%;
		}
		.top-wrapper {
			height: 100%;
		}
	}
</style>
