<script>
	import State from "$components/Dashboard/State.svelte";
	import states from "$data/states.csv";
	import viewport from "$stores/viewport.js";
	import { onMount, tick, getContext } from "svelte";
	import { nSolvedTemp, selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import localStorage from "$utils/localStorage.js";

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

	$: if ($nSolvedTemp !== undefined) {
		mazesSolved = localStorage.get("mazes") || [];
	}
	$: sortedStates = _.orderBy(
		states,
		sortFns[$order],
		$order === "barriers" ? "desc" : "asc"
	);
	$: geo = $order === "geo";
	$: if ($viewport.width && $order) measure();

	const measure = async () => {
		await tick();
		$columnWidth = document.querySelector("figure .state")?.clientWidth;
	};

	onMount(() => {
		measure();

		// clear local storage
		// localStorage.remove("mazes");
	});
</script>

<figure id="grid" class:geo class:intro class:fade={$selectedState}>
	{#if $order === "region"}
		{#each regions as region}
			{@const regionStates = sortedStates.filter((d) => d.region === region)}
			<h3>{_.startCase(region)}</h3>
			{#each regionStates as { id, name }}
				{@const label = _.startCase(name)}
				<State {id} {label} solved={mazesSolved.includes(id)} />
			{/each}
		{/each}
	{:else}
		{#if $order === "barriers"}
			<h3>Fewest to most barriers</h3>
		{/if}
		{#each sortedStates as { id, name, row, col, story }}
			{@const label = geo ? id.toUpperCase() : _.startCase(name)}
			<State
				{id}
				{label}
				{row}
				{col}
				{story}
				solved={mazesSolved.includes(id)}
			/>
		{/each}
	{/if}

	<div class="tracker">
		You've completed {mazesSolved === 50 ? "all " : `${mazesSolved.length}/`}50
		mazes.
		{#if mazesSolved === 50}
			<span class="done">
				{@html doneMessage}
			</span>
		{/if}
	</div>
</figure>

<style>
	figure {
		display: grid;
		height: auto;
		max-width: min(100%, 900px);
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 1rem;
		margin: auto;
		padding: 4rem 1rem;
		transition: opacity 0.3s;
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
		max-height: calc(100vh - 70px);
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-template-rows: repeat(8, minmax(0, 1fr));
		gap: 0;
	}
	h3 {
		grid-column: 1/-1;
		margin-bottom: 0;
	}
	.tracker {
		color: var(--color-accent-orange);
		font-weight: bold;
		grid-column: 1 / -1;
		grid-row: 1;
		text-align: center;
		position: sticky;
		top: 0;
		background: var(--color-bg);
		padding: 4px 0;
	}
	.geo .tracker {
		position: static;
		grid-row: 1 / 3;
		grid-column: 3 / 11;
		margin: 0 1rem 1rem 1rem;
	}
	.done {
		font-weight: normal;
		display: block;
	}

	@media (max-width: 600px) {
		figure {
			padding: 1.5em 1em;
		}
	}
</style>
