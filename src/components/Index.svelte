<script>
	import Intro from "$components/Intro.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Section from "$components/Section/Section.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import copy from "$data/copy.json";

	const { sections } = copy;
</script>

<article>
	<div class="above">
		<Intro />
		<Scroll />

		{#each sections as { title, chunks }}
			<Section {title} {chunks} />
		{/each}
	</div>
	<Dashboard />
</article>

<style>
	.above {
		background: var(--upper-bg);
	}
</style>
