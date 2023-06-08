<script>
	import Select from "$components/helpers/Select.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";

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

	// TODO: make a seperate variable here, goToState
	// when i select something, it updates $selectedState

	// when i open modal, focus should go in modal
	// when i close modal, focus should go to the state el that was just selected
	// focus looks like a pink outline
</script>

<div class="top-bar">
	<Select label="Order" options={orderOptions} bind:value={$order} />
	<Select
		label="See state maze for"
		options={highlightOptions}
		bind:value={$selectedState}
	/>
</div>

<style>
	.top-bar {
		background: var(--color-pp-gray-1);
		display: flex;
		justify-content: space-evenly;
	}
</style>
