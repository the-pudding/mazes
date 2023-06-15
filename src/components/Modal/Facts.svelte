<script>
	import Fact from "$components/Modal/Fact.svelte";
	import facts from "$data/facts.csv";
	import { selectedState, pathLength, mazeData } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";

	$: solution = _.orderBy(
		_.flatten($mazeData[$selectedState]).filter((d) => d.solutionIndex),
		"solutionIndex",
		"asc"
	);

	$: mobile = $viewport.width < 600;
	$: fullList = facts.filter((d) => d.id === $selectedState);
	$: filteredList = fullList.filter((d, i) => $pathLength >= thresholds[i]);
	$: displayList = mobile ? _.reverse(filteredList) : filteredList;
	$: thresholds = _.range(
		1,
		solution.length,
		Math.floor(solution.length / fullList?.length)
	);
</script>

{#each displayList as { thumb, text }, i (text)}
	<Fact {thumb} {text} />
{/each}
