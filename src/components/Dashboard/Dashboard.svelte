<script>
	import Grid from "$components/Dashboard/Grid.svelte";
	import Bar from "$components/Dashboard/Bar.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import localStorage from "$utils/localStorage.js";

	export let doneMessage;

	setContext("dashboard", {
		getOrder: () => order,
		getColumnWidth: () => columnWidth
	});

	const order = writable("geo");
	const columnWidth = writable(0);

	// TODO: maybe move all this to Grid
	$: mazesSolved = localStorage.get("mazes") || [];
</script>

<Grid />
<Bar />
<Modal />

<div class="tracker">
	You've completed {mazesSolved === 50 ? "all " : `${mazesSolved.length}/`}50
	mazes.
	{#if mazesSolved === 50}
		{@html doneMessage}
	{/if}
</div>

<style>
	.tracker {
		position: absolute;
		bottom: 80px;
		right: 1rem;
		max-width: 300px;
		text-align: right;
		color: var(--color-accent-orange);
		font-weight: bold;
	}
</style>
