<script>
	import State from "$components/Dashboard/State.svelte";
	import states from "$data/states.csv";
	import viewport from "$stores/viewport.js";
	import { onMount, tick, getContext } from "svelte";
	import _ from "lodash";

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
	});
</script>

<figure class:geo class:intro>
	{#if $order === "region"}
		{#each regions as region}
			{@const regionStates = sortedStates.filter((d) => d.region === region)}
			<h3>{_.startCase(region)}</h3>
			{#each regionStates as { id, name, ban }}
				{@const label = _.startCase(name)}
				<State {id} {label} ban={ban === "true"} />
			{/each}
		{/each}
	{:else}
		{#if $order === "barriers"}
			<h3>Fewest to most barriers</h3>
		{/if}
		{#each sortedStates as { id, name, row, col, ban }}
			{@const label = geo ? id.toUpperCase() : _.startCase(name)}
			<State {id} {label} {row} {col} ban={ban === "true"} />
		{/each}
	{/if}
</figure>

<style>
	figure {
		display: grid;
		max-width: min(100%, 900px);
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: 1rem;
		margin: auto;
		padding: 3rem 1rem;
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
		grid-column: 1/-1;
		margin-bottom: 0;
	}

	@media (max-width: 600px) {
		figure {
			padding: 1.5em 1em;
		}
	}
</style>
