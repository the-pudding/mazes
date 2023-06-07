<script>
	import Fact from "$components/Modal/Fact.svelte";
	import facts from "$data/facts.csv";
	import { selectedState, pathLength } from "$stores/misc.js";
	import data from "$data/iowa.json";
	import _ from "lodash";

	$: list = facts.filter((d) => d.id === $selectedState);

	const solution = _.orderBy(
		_.flatten(data).filter((d) => d.solution),
		"solutionIndex",
		"asc"
	);
	$: thresholds = _.range(
		1,
		solution.length,
		Math.floor(solution.length / list?.length)
	);
</script>

{#each list as { thumb, text }, i}
	{@const visible = $pathLength >= thresholds[i]}
	<Fact {thumb} {text} {visible} />
{/each}
