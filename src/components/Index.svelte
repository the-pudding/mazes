<script>
	import Footer from "$components/Footer.svelte";
	import copy from "$data/copy.json";
	import MicroCMS from "$components/helpers/MicroCMS.svelte";
	import Scrollytelling from "$components/Scrollytelling.svelte";
	import Pick from "$components/Pick.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Methodology from "$components/Methodology.svelte";
	import { selectedState, revealMethods } from "$stores/misc.js";
	import { onMount } from "svelte";
	import urlParams from "$utils/urlParams.js";

	const components = {
		Scrollytelling: Scrollytelling,
		Pick: Pick,
		Dashboard: Dashboard,
		Methodology: Methodology
	};

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
	<MicroCMS body={copy.body} {components} />
</article>

<div class="footer" class:visible={$revealMethods}>
	<Footer />
</div>

<style>
	article {
		display: flex;
		flex-direction: column;
	}
	:global(section:not(#dashboard)) {
		padding: 0 2rem;
	}
	/* :global(#methodology),
	.footer {
		display: none;
	} */
	:global(#methodology.visible) {
		display: flex;
	}
	:global(.footer.visible) {
		display: block;
	}
</style>
