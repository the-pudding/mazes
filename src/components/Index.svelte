<script>
	import copy from "$data/copy.json";
	import MicroCMS from "$components/helpers/MicroCMS.svelte";
	import Scrollytelling from "$components/Scrollytelling.svelte";
	import Pick from "$components/Pick.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import { selectedState } from "$stores/misc.js";
	import { onMount } from "svelte";
	import urlParams from "$utils/urlParams.js";

	const components = {
		Scrollytelling: Scrollytelling,
		Pick: Pick,
		Dashboard: Dashboard
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

<style>
</style>
