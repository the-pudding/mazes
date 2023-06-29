<script>
	import WIP from "$components/helpers/WIP.svelte";
	import Line from "$components/Line.svelte";
	import Landing from "$components/Landing.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Section from "$components/Section/Section.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import Methods from "$components/Methods.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import urlParams from "$utils/urlParams.js";

	const { sections } = copy;

	$: mobile = $viewport.width < 600;

	onMount(() => {
		const state = urlParams.get("state");
		if (state !== "") {
			const dashboardEl = document.getElementById("dashboard");
			dashboardEl.scrollIntoView({ behavior: "instant", alignToTop: true });
			$selectedState = state;
		}
	});
</script>

<WIP />
<article>
	<div class="tan" class:faded={$selectedState}>
		<Landing />
		<Scroll />

		<div class="sections">
			{#if !mobile}<Line />{/if}

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
