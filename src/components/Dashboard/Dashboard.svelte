<script>
	import Grid from "$components/Dashboard/Grid.svelte";
	import TopBar from "$components/Dashboard/TopBar.svelte";
	import _ from "lodash";
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
	import { setContext } from "svelte";
	import viewport from "$stores/viewport.js";
	import { writable } from "svelte/store";

	export let intro = false;
	export let zoom;

	setContext("dashboard", {
		intro,
		getOrder: () => order,
		getColumnWidth: () => columnWidth,
		getIsZoomedIn: () => isZoomedIn
	});
	const order = writable("alpha");
	const columnWidth = writable(0);
	const isZoomedIn = writable(intro ? true : false);

	$: mobile = $viewport.width < 600;
	$: $order = intro ? "geo" : mobile ? "alpha" : "geo";
	$: $isZoomedIn = !zoom;
</script>

<div class="container">
	{#if !intro}
		<TopBar />
	{/if}

	<Grid />

	{#if !intro}
		<div class="note">
			{@html copy.modalNote[$language]}
		</div>
	{/if}
</div>

<style>
	.container {
		position: relative;
	}
	.link {
		color: var(--color-pp-text-gray);
		background: none;
		display: flex;
		align-items: center;
		padding: 1rem 0 0 0;
		justify-content: end;
		position: absolute;
		right: 1rem;
		bottom: 4rem;
	}
	.note {
		max-width: 800px;
		margin: auto;
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: row;
		align-items: start;
		justify-content: space-between;
		color: var(--color-pp-text-gray);
		font-size: 0.8rem;
	}
</style>
