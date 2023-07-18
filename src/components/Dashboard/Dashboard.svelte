<script>
	import Icon from "$components/helpers/Icon.svelte";
	import Grid from "$components/Dashboard/Grid.svelte";
	import TopBar from "$components/Dashboard/TopBar.svelte";
	import _ from "lodash";
	import copy from "$data/copy.json";
	import inView from "$actions/inView.js";
	import { dashboardInView, language } from "$stores/misc.js";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import viewport from "$stores/viewport.js";

	export let intro = false;
	export let zoom;

	setContext("dashboard", {
		intro,
		getOrder: () => order,
		getColumnWidth: () => columnWidth,
		getIsZoomedIn: () => isZoomedIn
	});
	const order = writable(intro ? "geo" : "alpha");
	const columnWidth = writable(0);
	const isZoomedIn = writable(intro ? true : false);

	$: mobile = $viewport.width < 600;
	$: $isZoomedIn = !zoom;

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

	<!-- {#if mobile && !intro}
		<button class="mobile link" on:click={() => (location.href = "")}>
			<span>Read the story</span>
			<Icon name="arrow-right" />
		</button>
	{/if} -->

	<Grid />

	<!-- {#if !mobile && !intro}
		<button class="link" on:click={() => (location.href = "")}>
			<span>Read the story</span>
			<Icon name="arrow-right" />
		</button>
	{/if} -->

	{#if !intro}
	<div class="notes">
		<p>{@html copy.modalNote[$language]}</p>
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
	.mobile {
		width: 100%;
		justify-content: end;
		position: static;
		margin: 1rem 0 0 0;
		padding: 0 1rem 0 0;
	}
	.link:hover {
		color: var(--color-pp-text-gray-1);
		transform: translateX(-0.125rem);
		transition: all 0.2s ease-in;
	}
	.link span {
		margin-left: 0.3rem;
	}
	.notes {
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: row;
		align-items: start;
		justify-content: space-between;
	}
	.notes p {
		color: var(--color-pp-text-gray);
		font-size: 0.8rem;
		width: 100%;
	}
</style>
