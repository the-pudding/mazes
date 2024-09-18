<script>
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import { selectedState } from "$stores/misc.js";
	import { onMount } from "svelte";
	import urlParams from "$utils/urlParams.js";

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
	<Dashboard />
</article>

<style>
</style>
