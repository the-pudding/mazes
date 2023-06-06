<script>
	import Fact from "$components/Modal/Fact.svelte";
	import facts from "$data/facts.csv";
	import { selectedState } from "$stores/misc.js";

	$: list = facts.filter((d) => d.id === $selectedState);
</script>

{#each list as { thumb, text }}
	<Fact {thumb} {text} />
{/each}
