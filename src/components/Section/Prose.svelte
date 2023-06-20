<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Button from "$components/Button.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import states from "$data/states.csv";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import { fade } from "svelte/transition";
	import mq from "$stores/mq.js";
	import inView from "$actions/inView.js";
	import loadMazeData from "$utils/loadMazeData.js";

	export let maze;
	export let text;
	export let align;

	let data;
	const stateName = _.startCase(states.find((d) => d.id === maze).name);
	const goToMaze = () => {
		$selectedState = maze;
	};

	$: reverse = align === "right";

	const onEnter = async () => {
		data = await loadMazeData(maze);
	};
</script>

<div class="container" class:reverse use:inView on:enter={onEnter}>
	<div class="words" class:reverse>
		{#each text as { value }}
			<p>{@html value}</p>
		{/each}
	</div>

	{#if data && data.length}
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

			<Button text="go to maze" style="margin-top: 0.5rem" onClick={goToMaze} />
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
		font-family: var(--font-heavy);
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
