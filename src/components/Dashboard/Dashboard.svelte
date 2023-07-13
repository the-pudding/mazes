<script>
	import Grid from "$components/Dashboard/Grid.svelte";
	import TopBar from "$components/Dashboard/TopBar.svelte";
	import _ from "lodash";
	import inView from "$actions/inView.js";
	import { dashboardInView } from "$stores/misc.js";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	export let intro = false;

	setContext("dashboard", {
		intro,
		getOrder: () => order,
		getColumnWidth: () => columnWidth
	});

	const order = writable(intro ? "geo" : "alpha");
	const columnWidth = writable(0);

	const onEnter = () => {
		if (!intro) $dashboardInView = true;
	};
	const onExit = () => {
		if (!intro) $dashboardInView = false;
	};
</script>

<div class="container" use:inView on:enter={onEnter} on:exit={onExit}>
	{#if !intro}
		<TopBar />
	{/if}
	<Grid />
</div>
