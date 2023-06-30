<script>
	import State from "$components/Dashboard/State.svelte";
	import states from "$data/states.csv";
	import viewport from "$stores/viewport.js";
	import { onMount, tick, getContext } from "svelte";
	import _ from "lodash";

	const { interactive, getOrder, getColumnWidth } = getContext("dashboard");
	const order = getOrder();
	const columnWidth = getColumnWidth();

	const regions = _.uniq(states.map((d) => d.region));
	const sortFns = {
		geo: (d) => `${d.row}-${d.col}`,
		alpha: (d) => d.name,
		region: (d) => d.region,
		barriers: (d) => +d.score
	};

	$: mobile = $viewport.width < 600;
	$: sortedStates = _.orderBy(
		states,
		sortFns[$order],
		$order === "barriers" ? "desc" : "asc"
	);
	$: $order = mobile ? "alpha" : "geo";
	$: geo = $order === "geo" && !mobile;
	$: if ($viewport.width && $order) measure();

	const measure = async () => {
		await tick();
		$columnWidth = document.querySelector("figure .state")?.clientWidth;
	};

	onMount(() => {
		measure();
	});
</script>

<figure class:geo class:interactive>
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
		padding: 0;
	}
	figure.interactive {
		padding: 3rem 1rem;
	}
	figure.geo {
		/* max-width: 840px; */
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(8, 1fr);
		gap: 0;
	}
	h3 {
		grid-column: 1/-1;
		margin-bottom: 0;
	}
</style>
