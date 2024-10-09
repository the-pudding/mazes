<script>
	import Info from "$components/Modal/Info.svelte";
	import Maze from "$components/Maze/Maze.svelte";
	import loadMazeData from "$utils/loadMazeData.js";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import { tick } from "svelte";

	export let sentences;

	let data;
	let width;
	let height;
	let loading = false;

	$: availableSpace = Math.min(height, width);
	$: numCells = data && data.length ? Math.sqrt(data.length) : 0;
	$: if ($selectedState) getMazeData();

	const getMazeData = async () => {
		loading = true;
		data = await loadMazeData($selectedState);
		await tick();
		loading = false;
	};
</script>

<div class="contents">
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

<style>
	.contents {
		display: flex;
		height: 100%;
		gap: 3rem;
	}
	.info {
		width: 50%;
	}
	.maze {
		width: 50%;
		display: flex;
		align-items: center;
	}

	@media (max-width: 600px) {
		.contents {
			flex-direction: column;
			align-items: center;
		}
		.info,
		.maze {
			width: 100%;
		}
		.maze {
			max-width: 80%;
		}
	}
</style>
