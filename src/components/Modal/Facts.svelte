<script>
	import Fact from "$components/Modal/Fact.svelte";
	import facts from "$data/facts.csv";
	import { selectedState, mazeLocation } from "$stores/misc.js";
	import { scaleBand, scaleQuantile, range } from "d3";
	import _ from "lodash";

	export let mazeSize;

	$: list = facts.filter((d) => d.id === $selectedState);

	const getZone = (row, col) => {};
</script>

{#each list as { thumb, text }}
	<Fact {thumb} {text} />
{/each}
