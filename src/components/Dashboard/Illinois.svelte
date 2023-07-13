<script>
	import Maze from "$components/Maze/Maze.svelte";
	import loadMazeData from "$utils/loadMazeData.js";
	import { onMount } from "svelte";
	import { scrollStep, direction } from "$stores/misc.js";

	let walls;
	let simple;
	let full;
	let fullWalls = false;

	$: if (
		!fullWalls &&
		($scrollStep >= 6 || ($scrollStep === undefined && $direction === "down"))
	)
		enterWalls();
	$: if (fullWalls && $scrollStep < 6) exitWalls();

	const enterWalls = () => {
		setTimeout(() => {
			walls = full;
			fullWalls = true;
		}, 1500);
	};
	const exitWalls = () => {
		walls = simple;
		fullWalls = false;
	};

	onMount(async () => {
		simple = await loadMazeData("il-simple");
		full = await loadMazeData("il");
		walls = simple;
	});
</script>

<div class="container">
	{#if walls && walls.length}
		<Maze
			wallData={walls}
			size={Math.sqrt(simple.length)}
			playable={false}
			animated={false}
			intro={true}
			{simple}
		/>
	{/if}
</div>

<style>
	.container {
		background: blue;
	}
</style>
