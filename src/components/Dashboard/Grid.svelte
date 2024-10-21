<script>
	import State from "$components/Dashboard/State.svelte";
	import states from "$data/states.csv";
	import viewport from "$stores/viewport.js";
	import { onMount, tick, getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import localStorage from "$utils/localStorage.js";
	import plusIcon from "$svg/plus.svg";

	export let doneMessage;

	const { intro, getOrder, getColumnWidth } = getContext("dashboard");
	const order = getOrder();
	const columnWidth = getColumnWidth();

	const regions = _.uniq(states.map((d) => d.region));
	const sortFns = {
		geo: (d) => `${d.row}-${d.col}`,
		alpha: (d) => d.name,
		region: (d) => d.region,
		barriers: (d) => {
			if (d.ban === "true") return -1;
			return +d.score;
		}
	};

	let mazesSolved = [];

	const measure = async () => {
		await tick();
		$columnWidth = document.querySelector("figure .state")?.clientWidth;
	};
	const loadSolved = () => {
		mazesSolved = localStorage.get("mazes") || [];
	};

	onMount(() => {
		measure();
		loadSolved();

		// clear local storage
		// localStorage.remove("mazes");
	});

	$: sortedStates = _.orderBy(
		states,
		sortFns[$order],
		$order === "barriers" ? "desc" : "asc"
	);
	$: geo = $order === "geo";
	$: if (!$selectedState) loadSolved();
	$: if ($viewport.width && $order) measure();
</script>

<div class="grid-wrapper">
	<figure id="grid" class:geo class:intro class:fade={$selectedState}>
		<div class="tracker" class:hasBorder={!geo}>
			<p class="tracker-sentence">
				You've completed {mazesSolved.length === 51
					? "all "
					: `${mazesSolved.length}/`}51 mazes.
				{#if mazesSolved.length === 51}
					<span class="done">
						{@html doneMessage}
					</span>
				{/if}
			</p>
			{#if mazesSolved.length !== 51}
				<div class="maze-directions">
					<p>
						Select a state maze to try to solve it. States with <span
							class="icon">{@html plusIcon}</span
						> plus signs have personal stories.
					</p>
				</div>
			{/if}
		</div>

		{#if $order === "region"}
			{#each regions as region}
				{@const regionStates = sortedStates.filter((d) => d.region === region)}
				<h3>{_.startCase(region)}</h3>
				{#each regionStates as { id, name }}
					{@const label = _.startCase(name)}
					<State {id} {label} solved={mazesSolved.find((d) => d.id === id)} />
				{/each}
			{/each}
		{:else}
			{#if $order === "barriers"}
				<h3>Most to fewest barriers</h3>
			{/if}
			{#each sortedStates as { id, name, row, col, story }}
				{@const label = geo ? id.toUpperCase() : _.startCase(name)}
				<State
					{id}
					{label}
					{row}
					{col}
					{story}
					solved={mazesSolved.find((d) => d.id === id)}
				/>
			{/each}
		{/if}
	</figure>
</div>

<style>
	.grid-wrapper {
		width: 100%;
	}
	figure {
		display: grid;
		height: auto;
		max-width: min(100%, 900px);
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 1rem;
		padding: 1.5rem 1rem;
		margin: auto;
		transition: opacity calc(var(--1s) * 0.3);
	}
	figure.fade {
		opacity: 0;
		pointer-events: none;
	}
	figure.intro {
		padding: 0;
		height: 100%;
	}
	figure.geo {
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-rows: repeat(8, minmax(0, 1fr));
		gap: 0;
	}
	h3 {
		font-family: var(--serif);
		grid-column: 1/-1;
		margin: 2rem 0 0 0;
		font-size: var(--24px);
		font-weight: 700;
		padding: 0 0 0 0.25rem;
	}
	.tracker {
		color: var(--color-accent-orange);
		font-weight: bold;
		font-size: var(--18px);
		grid-column: 1 / -1;
		grid-row: 1;
		text-align: center;
		position: sticky;
		top: 0;
		background: rgba(255, 253, 248, 0.95);
		z-index: 1000;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.tracker.hasBorder {
		border-bottom: 1px solid var(--color-tan);
		height: auto;
		padding: 0.5rem 0;
	}
	.geo .tracker {
		position: static;
		grid-row: 1 / 3;
		grid-column: 3 / 11;
		border-bottom: none;
		background: none;
	}
	.done {
		font-weight: normal;
		display: block;
	}
	.tracker-sentence {
		font-size: var(--14px);
		margin: 0;
	}
	.maze-directions {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 360px;
	}
	.maze-directions p {
		color: var(--color-fg);
		font-weight: 500;
		font-size: var(--14px);
		margin: 0;
		font-style: italic;
	}
	span.icon {
		height: 17px;
		width: 17px;
		display: inline-block;
		margin: 0 1px 0 2px;
		position: relative;
		top: 3px;
	}

	@media (max-width: 700px) {
		figure {
			padding: 1.5rem 1rem;
		}
		.tracker {
			border-bottom: 1px solid var(--color-tan);
		}
		.maze-directions p {
			font-size: var(--12px);
			line-height: 1;
		}
		span.icon {
			margin: 0 0 0 0;
			top: 4px;
		}
		.tracker-sentence {
			font-size: var(--12px);
		}
	}

	@media (max-width: 500px) {
		.tracker {
			padding: 0.5rem;
		}
	}
</style>
