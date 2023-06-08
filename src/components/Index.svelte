<script>
	import WIP from "$components/helpers/WIP.svelte";
	import Intro from "$components/Intro.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Section from "$components/Section/Section.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import copy from "$data/copy.json";
	import { selectedState } from "$stores/misc.js";

	const { sections } = copy;
</script>

<WIP />
<article>
	<div class="above" class:faded={$selectedState}>
		<!-- <Intro />
		<Scroll /> -->

		{#each sections as { title, chunks }}
			<Section {title} {chunks} />
		{/each}
	</div>

	<div class="below" class:faded={$selectedState}>
		<Dashboard />
	</div>

	<Modal />
</article>

<style>
	.above {
		background: var(--upper-bg);
	}
	.faded {
		opacity: 0.2;
	}
</style>
