<script>
	import Select from "$components/helpers/Select.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";

	const { getOrder } = getContext("dashboard");
	const order = getOrder();

	const orderOptions = [
		{ label: "alphabetically", value: "alpha" },
		{ label: "geographically", value: "geo" },
		{ label: "regionally", value: "region" },
		{ label: "by more barriers", value: "barriers-desc" },
		{ label: "by fewer barriers", value: "barriers-asc" }
	];
	const highlightOptions = states.map((d) => ({ label: d.name, value: d.id }));
</script>

<div class="top-bar">
	<Select label="Order" options={orderOptions} bind:value={$order} />
	<!-- <Select label="Highlight" options={highlightOptions} bind:value={highlight} /> -->
</div>

<style>
	.top-bar {
		background: var(--color-pp-gray-1);
		display: flex;
		justify-content: space-evenly;
	}
</style>
