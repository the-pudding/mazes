<script>
	import Fact from "$components/Modal/Fact.svelte";
	import facts from "$data/facts.csv";
	import { selectedState, pathLength } from "$stores/misc.js";
	import data from "$data/iowa.json";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";

	$: mobile = $viewport.width < 600;
	$: fullList = facts.filter((d) => d.id === $selectedState);
	$: filteredList = fullList.filter((d, i) => $pathLength >= thresholds[i]);
	$: displayList = mobile ? _.reverse(filteredList) : filteredList;

	const solution = _.orderBy(
		_.flatten(data).filter((d) => d.solution),
		"solutionIndex",
		"asc"
	);
	$: thresholds = _.range(
		1,
		solution.length,
		Math.floor(solution.length / fullList?.length)
	);
</script>

{#each displayList as { thumb, text }, i (text)}
	<Fact {thumb} {text} />
{/each}
