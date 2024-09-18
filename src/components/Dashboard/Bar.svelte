<script>
	import Select from "$components/helpers/Select.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";

	const { getOrder } = getContext("dashboard");
	const order = getOrder();

	let selectState = "default";
	let selectStory = "courtney";

	const highlightOptions = [
		{ label: "select state", value: "default" },
		...states.map((d) => ({ label: _.startCase(d.name), value: d.id }))
	];
	const storyOptions = [
		{ label: "Courtney", value: "courtney" },
		{ label: "Margot", value: "margot" },
		{ label: "Simone", value: "simone" },
		{ label: "Billie", value: "billie" },
		{ label: "Ava", value: "ava" },
		{ label: "Lucia", value: "lucia" }
	];

	$: orderOptions = [
		{ label: "Alphabetically", value: "alpha" },
		{ label: "Geographically", value: "geo", disabled: mobile },
		{ label: "Regionally", value: "region" },
		{ label: "By barriers", value: "barriers" }
	];
	$: mobile = $viewport.width < 600;
	$: if (selectState && selectState !== "default") $selectedState = selectState;
</script>

<div class="bar">
	<div class="select">
		<Select label="Order mazes" options={orderOptions} bind:value={$order} />
	</div>

	<div class="select">
		<Select
			label={mobile ? "Find" : "See state maze for"}
			options={highlightOptions}
			bind:value={selectState}
		/>
	</div>

	<div class="select">
		<Select
			label={"Pick a story"}
			options={storyOptions}
			bind:value={selectStory}
		/>
	</div>
</div>

<style>
	.bar {
		background: #e7e2d4;
		color: #b0a380;
		display: flex;
		justify-content: space-evenly;
		padding: 1rem;
		position: sticky;
		top: 3rem;
		z-index: 10;
		height: 70px;
		width: 100%;
	}
	.select {
		width: fit-content;
	}

	@media (max-width: 600px) {
		.bar {
			flex-direction: column;
			align-items: center;
			font-size: 0.8rem;
		}
		.select:first-of-type {
			margin-bottom: 1rem;
		}
	}
</style>
