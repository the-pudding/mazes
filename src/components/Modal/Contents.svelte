<script>
	import Maze from "$components/Maze/Maze.svelte";
	import loadMazeData from "$utils/loadMazeData.js";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import { tick } from "svelte";

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
		{$selectedState}
	</div>
	<div class="maze" bind:clientWidth={width} bind:clientHeight={height}>
		{#key $selectedState}
			<Maze
				{availableSpace}
				wallData={data}
				{numCells}
				animated={false}
				{loading}
			/>
		{/key}
	</div>
</div>

<style>
	.contents {
		display: flex;
		height: 100%;
	}
	.info {
		flex-shrink: 0;
	}
	.info,
	.maze {
		width: 50%;
	}
</style>
