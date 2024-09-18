<script>
	import Grid from "$components/Dashboard/Grid.svelte";
	import Bar from "$components/Dashboard/Bar.svelte";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	setContext("dashboard", {
		getOrder: () => order,
		getColumnWidth: () => columnWidth
	});

	const order = writable("geo");
	const columnWidth = writable(0);
</script>

<section id="dashboard">
	<Grid />
	<Bar />
</section>

<style>
	section {
		position: relative;
	}
</style>
