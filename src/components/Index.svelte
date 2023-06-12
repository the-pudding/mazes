<script>
	import WIP from "$components/helpers/WIP.svelte";
	import Intro from "$components/Intro.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Section from "$components/Section/Section.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import Methods from "$components/Methods.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import { selectedState, mazeData } from "$stores/misc.js";
	import states from "$data/states.csv";
	import _ from "lodash";

	const { sections } = copy;

	const modules = import.meta.glob("../data/states/*.json");
	for (const path in modules) {
		modules[path]().then((mod) => {
			const state = path.replace("../data/states/", "").replace(".json", "");
			const abbrev = states
				.find((d) => _.kebabCase(state) === _.kebabCase(d.name))
				?.id.toLowerCase();
			$mazeData[abbrev] = mod.default;
		});
	}
</script>

<WIP />
<article>
	<div class="tan" class:faded={$selectedState}>
		<Intro />
		<Scroll />

		{#each sections as { title, chunks }}
			<Section {title} {chunks} />
		{/each}
	</div>

	<div class="white" class:faded={$selectedState}>
		<Dashboard />
	</div>
	<Modal />

	<div class="tan" class:faded={$selectedState}>
		<Methods />
	</div>

	<Footer />
</article>

<style>
	.tan {
		background: var(--upper-bg);
	}
	.white {
		background: white;
	}
	.faded {
		opacity: 0.2;
	}
</style>
