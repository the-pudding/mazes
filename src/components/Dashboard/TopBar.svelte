<script>
	import Select from "$components/helpers/Select.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";

	const { getOrder } = getContext("dashboard");
	const order = getOrder();

	let selectState = "default";
	const highlightOptions = [
		{ label: "select state", value: "default" },
		...states.map((d) => ({ label: d.name, value: d.id }))
	];
	$: orderOptions = [
		{ label: "alphabetically", value: "alpha" },
		{ label: "geographically", value: "geo", disabled: mobile },
		{ label: "regionally", value: "region" },
		{ label: "by barriers", value: "barriers" }
	];

	$: mobile = $viewport.width < 600;
	$: if (selectState && selectState !== "default") $selectedState = selectState;
</script>

<div class="top-bar">
	<div class="select">
		<Select label="Order" options={orderOptions} bind:value={$order} />
	</div>

	<div class="select">
		<Select
			label={mobile ? "Find" : "See state maze for"}
			options={highlightOptions}
			bind:value={selectState}
		/>
	</div>
</div>

<style>
	.top-bar {
		background: var(--color-pp-gray-1);
		display: flex;
		justify-content: space-evenly;
		padding: 1rem;
		position: sticky;
		top: 3rem;
		z-index: 10;
		width: 100%;
	}
	.select {
		width: fit-content;
	}

	@media (max-width: 600px) {
		.top-bar {
			flex-direction: column;
			align-items: center;
			font-size: 0.8rem;
		}
		.select:first-of-type {
			margin-bottom: 1rem;
		}
	}
</style>
