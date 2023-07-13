<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Button from "$components/Button.svelte";
	import Grid from "$components/Section/Grid.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import states from "$data/states.csv";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import { fade } from "svelte/transition";
	import mq from "$stores/mq.js";
	import inView from "$actions/inView.js";
	import loadMazeData from "$utils/loadMazeData.js";
	import { language } from "$stores/misc.js";

	export let maze;
	export let text;
	export let align;

	let data;

	const goToMaze = () => {
		$selectedState = maze;
	};

	$: grid = maze && maze.includes("|");
	$: reverse = align === "right";
	$: center = align === "center";
	$: stateName =
		maze && !grid ? _.startCase(states.find((d) => d.id === maze).name) : null;

	const onEnter = async () => {
		if (maze && !grid) data = await loadMazeData(maze);
	};
</script>

<div class="container" class:reverse class:center use:inView on:enter={onEnter}>
	<div class="words" class:reverse>
		{#each text as t}
			<p>{@html t[$language]}</p>
		{/each}
	</div>

	{#if grid}
		<Grid ids={maze.split("|")} />
	{:else if maze && data && data.length}
		<div
			class="maze"
			transition:fade={{ duration: $mq.reducedMotion ? 0 : 800 }}
		>
			<div class="top">
				<div class="state">{stateName}</div>
				<button class="link" on:click={() => (location.href = "#dashboard")}
					>See all mazes <Icon name="arrow-right" /></button
				>
			</div>

			<Maze
				wallData={data}
				size={Math.sqrt(data.length)}
				playable={false}
				animated={false}
			/>

			<Button text="go to maze" style="margin-top: 1rem" onClick={goToMaze} />
		</div>
	{/if}
</div>

<style>
	.container {
		margin: 5rem 0;
		display: grid;
		grid-template-columns: 1fr 250px;
		align-items: center;
		gap: 3rem;
		min-height: 333px;
	}
	.container.reverse {
		grid-template-columns: 250px 1fr;
		grid-auto-flow: dense;
	}
	.container.center {
		grid-template-columns: 1fr;
		margin: auto;
	}
	.container:last-of-type {
		padding-bottom: 5rem;
	}
	.maze {
		display: flex;
		flex-direction: column;
		align-items: start;
	}
	.words.reverse {
		grid-column: 2;
	}
	.words p {
		font-size: 1.2rem;
		line-height: 1.75;
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.state {
		font-size: 1.5rem;
		font-family: var(--font-heavy);
		font-weight: 900;
	}
	.link {
		display: flex;
		align-items: center;
		color: var(--color-pp-text-gray);
		font-size: 0.9rem;
		background: none;
		padding-right: 0;
	}
	.link:hover {
		color: var(--color-pp-text-gray-1);
		transform: translateX(0.125rem);
		transition: all 0.2s ease-in;
	}
	:global(.words p strong) {
		background: var(--color-pp-gray-1);
		padding: 0.25rem 0.5rem;
		box-shadow: 0px 0px 5px rgba(124, 115, 115, 0.1);
		border-radius: 5px;
	}

	@media (max-width: 800px) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin: 2rem 0;
		}
		.maze {
			align-items: center;
			width: 60%;
			max-width: 300px;
		}
		.top {
			flex-direction: column;
		}
	}
</style>
