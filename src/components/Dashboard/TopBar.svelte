<script>
	import Select from "$components/helpers/Select.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";

	const { getOrder } = getContext("dashboard");
	const order = getOrder();

	const orderOptions = [
		{ label: "alphabetically", value: "alpha" },
		{ label: "geographically", value: "geo" },
		{ label: "regionally", value: "region" },
		{ label: "by barriers", value: "barriers" }
	];
	const highlightOptions = [
		{ label: "select state", value: "default" },
		...states.map((d) => ({ label: d.name, value: d.id }))
	];

	let selectState = "default";

	$: mobile = $viewport.width < 600;
	$: if (selectState && selectState !== "default") $selectedState = selectState;
</script>

<div class="top-bar">
	<Select label="Order" options={orderOptions} bind:value={$order} />
	<Select
		label={mobile ? "Find" : "See state maze for"}
		options={highlightOptions}
		bind:value={selectState}
	/>
</div>

<style>
	.top-bar {
		background: var(--color-pp-gray-1);
		display: flex;
		justify-content: space-evenly;
		padding: 0 1rem;
		position: sticky;
		top: 3rem;
		z-index: 10;
	}
</style>
