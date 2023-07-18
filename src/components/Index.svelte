<script>
	import Line from "$components/Line.svelte";
	import Landing from "$components/Landing.svelte";
	import Scroll from "$components/Scroll.svelte";
	import Section from "$components/Section/Section.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import Methods from "$components/Methods.svelte";
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import { selectedState, dashboardInView, storyInView } from "$stores/misc.js";
	import inView from "$actions/inView.js";
	import _ from "lodash";
	import viewport from "$stores/viewport.js";
	import { onMount } from "svelte";
	import urlParams from "$utils/urlParams.js";

	const { sections } = copy;

	$: small = $viewport.width < 800;

	onMount(() => {
		const state = urlParams.get("state");
		if (state !== "") {
			const dashboardEl = document.getElementById("dashboard");
			dashboardEl.scrollIntoView({ behavior: "instant", alignToTop: true });
			$selectedState = state;
		}
	});
</script>

<article>
	<div
		class="story"
		class:faded={$selectedState}
		use:inView
		on:enter={() => ($storyInView = true)}
		on:exit={() => ($storyInView = false)}
	>
		<Landing />
		<Scroll />

		<div class="sections">
			{#if !small}
				<Line />
			{/if}

			{#each sections as { title, chunks }}
				<Section {title} {chunks} />
			{/each}
		</div>
	</div>

	<div
		id="dashboard"
		class:faded={$selectedState}
		use:inView
		on:enter={() => ($dashboardInView = true)}
		on:exit={() => ($dashboardInView = false)}
	>
		<Dashboard />
	</div>
	<Modal />

	<div class="end" class:faded={$selectedState}>
		<Methods />
	</div>

	<Footer />
</article>

<style>
	.sections {
		position: relative;
	}
	.story,
	.end {
		background: var(--upper-bg);
	}
	#dashboard {
		background: white;
	}
	.faded {
		opacity: 0.2;
	}
	:global(a:hover) {
		color: var(--color-pp-text-gray);
	}
</style>
