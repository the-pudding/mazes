<script>
	import { selectedState } from "$stores/misc.js";
	import stateData from "$data/states.csv";
	import factsData from "$data/facts.csv";
	import _ from "lodash";

	$: name = _.startCase(stateData.find((d) => d.id === $selectedState).name);
	$: facts = factsData.filter((d) => d.id === $selectedState);
</script>

<h2>{name}</h2>

{#each facts as { fact }}
	<p>{@html fact}</p>
{/each}

<style>
	h2 {
		font-family: var(--serif);
		font-weight: bold;
		font-size: 3rem;
	}
</style>
