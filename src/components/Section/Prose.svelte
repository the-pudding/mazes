<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Button from "$components/Button.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import states from "$data/states.csv";
	import { selectedState, mazeData } from "$stores/misc.js";
	import _ from "lodash";
	import inView from "$actions/inView.js";
	import { csv } from "d3";

	export let maze;
	export let text;
	export let align;

	const stateName = _.startCase(states.find((d) => d.id === maze).name);
	const goToMaze = () => {
		$selectedState = maze;
	};

	$: data = $mazeData[maze];
	$: reverse = align === "right";

	const onEnter = async () => {
		// function: load state data (external)
		// check if it's in the store, if not, load it
		// data = await csv(`assets/states/${maze}.json`); // todo
		// save it to store
	};
</script>

<div class="container" class:reverse>
	<div class="words" class:reverse>
		{#each text as { value }}
			<p>{@html value}</p>
		{/each}
	</div>

	<div class="maze">
		<div class="top">
			<div class="state">{stateName}</div>
			<button class="link" on:click={() => (location.href = "#dashboard")}
				>See all mazes <Icon name="arrow-right" /></button
			>
		</div>

		{#if data && data.length}
			<Maze
				wallData={data}
				size={data.length}
				playable={false}
				animated={false}
			/>
		{/if}

		<Button text="go to maze" style="margin-top: 0.5rem" onClick={goToMaze} />
	</div>
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
	.words.reverse {
		grid-column: 2;
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.state {
		font-size: 1.5rem;
		font-weight: 900;
	}
	.link {
		display: flex;
		align-items: center;
		color: var(--color-pp-text-gray);
		font-size: 0.9rem;
		background: none;
	}
	:global(.words p strong) {
		background: var(--color-pp-gray-1);
		padding: 0rem 0.3rem;
		box-shadow: 0px 0px 5px rgba(124, 115, 115, 0.1);
		border-radius: 5px;
	}

	@media (max-width: 600px) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
