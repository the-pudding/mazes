<script>
	import Grid from "$components/Dashboard/Grid.svelte";
	import TopBar from "$components/Dashboard/TopBar.svelte";
	import _ from "lodash";
	import inView from "$actions/inView.js";
	import { dashboardInView } from "$stores/misc.js";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	export let type = "interactive";

	let interactive = type === "interactive";

	setContext("dashboard", {
		interactive,
		type,
		getOrder: () => order,
		getColumnWidth: () => columnWidth
	});

	const order = writable(interactive ? "alpha" : "geo");
	const columnWidth = writable(0);

	const onEnter = () => {
		if (interactive) $dashboardInView = true;
	};
	const onExit = () => {
		if (interactive) $dashboardInView = false;
	};
</script>

<div
	class="container"
	class:interactive
	use:inView
	on:enter={onEnter}
	on:exit={onExit}
>
	{#if interactive}
		<TopBar />
	{/if}
	<Grid />
</div>

<style>
	.container.interactive {
		min-height: calc(100vh - 3rem);
		display: grid;
		grid-template-rows: 80px 1fr;
	}
</style>
