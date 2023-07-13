<script>
	import Icon from "$components/helpers/Icon.svelte";
	import Grid from "$components/Dashboard/Grid.svelte";
	import TopBar from "$components/Dashboard/TopBar.svelte";
	import _ from "lodash";
	import inView from "$actions/inView.js";
	import { dashboardInView } from "$stores/misc.js";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import viewport from "$stores/viewport.js";

	export let intro = false;

	setContext("dashboard", {
		intro,
		getOrder: () => order,
		getColumnWidth: () => columnWidth
	});

	const order = writable(intro ? "geo" : "alpha");
	const columnWidth = writable(0);

	$: mobile = $viewport.width < 600;

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

	{#if !mobile}
		<button class="link" on:click={() => (location.href = "#dashboard")}>
			<Icon name="arrow-left" />
			<span>Read the story</span>
		</button>
	{/if}
</div>

<style>
	.container {
		position: relative;
		height: calc(100vh - 3rem);
	}
	.link {
		position: absolute;
		bottom: 1rem;
		right: 0;
		color: var(--color-pp-text-gray);
		background: none;
		display: flex;
		align-items: center;
	}
	.link:hover {
		color: var(--color-pp-text-gray-1);
		transform: translateX(-0.125rem);
		transition: all 0.2s ease-in;
	}
	.link span {
		margin-left: 0.3rem;
	}
	@media (max-width: 600px) {
		.container {
			height: auto;
		}
	}
</style>
