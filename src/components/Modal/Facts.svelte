<script>
	import Fact from "$components/Modal/Fact.svelte";
	import facts from "$data/facts.csv";
	import { selectedState, pathLength, mazeData } from "$stores/misc.js";
	import _ from "lodash";
	import { browser } from "$app/environment";

	export let ban;

	$: solution = _.orderBy(
		_.flatten($mazeData[$selectedState]).filter((d) => d.solutionIndex),
		"solutionIndex",
		"asc"
	);
	$: thresholds = _.range(
		1,
		solution.length,
		Math.floor(solution.length / stateFacts?.length)
	);
	$: stateFacts = facts.filter((d) => d.id === $selectedState);
	$: displayList = stateFacts.map((d, i) => ({
		...d,
		i,
		visible: ban || $selectedState === "wi" || $pathLength >= thresholds[i]
	}));
	$: visibleFacts = displayList.filter((d) => d.visible);
	$: numFacts = visibleFacts.length;
	$: numFacts, scrollToFact();

	const scrollToFact = () => {
		if (!browser) return;

		const i = visibleFacts.length - 1 <= 0 ? 0 : visibleFacts.length - 1;
		const el = document.querySelector(`#fact-${i}`);
		if (el) {
			el.scrollIntoView({
				behavior: "smooth",
				alignToTop: true
			});
		}
	};
</script>

{#each displayList as { thumb, text, visible }, i (text)}
	<Fact {thumb} {text} {visible} {i} />
{/each}
