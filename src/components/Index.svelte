<script>
	import WIP from "$components/helpers/WIP.svelte";
	import Line from "$components/Line.svelte";
	import Intro from "$components/Intro.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Section from "$components/Section/Section.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import Methods from "$components/Methods.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";

	const { sections } = copy;
</script>

<WIP />
<article>
	<div class="tan" class:faded={$selectedState}>
		<Intro />
		<Scroll />

		<div class="sections">
			<Line />
			{#each sections as { title, chunks }}
				<Section {title} {chunks} />
			{/each}
		</div>
	</div>

	<div id="dashboard" class="white" class:faded={$selectedState}>
		<Dashboard />
	</div>
	<Modal />

	<div class="tan" class:faded={$selectedState}>
		<Methods />
	</div>

	<Footer />
</article>

<style>
	.sections {
		position: relative;
	}
	.tan {
		background: var(--upper-bg);
	}
	.white {
		background: white;
	}
	.faded {
		opacity: 0.2;
	}
	:global(a:hover) {
		color: var(--color-pp-text-gray);
	}
</style>
