<script>
	import Select from "$components/helpers/Select.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";
	import { selectedState, revealMethods } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import _ from "lodash";
	import infoIcon from "$svg/info.svg";

	const { getOrder } = getContext("dashboard");
	const order = getOrder();

	let selectState = "default";
	let selectStory = "default";

	const highlightOptions = [
		{ label: "select state", value: "default" },
		...states.map((d) => ({ label: _.startCase(d.name), value: d.id }))
	];
	const storyOptions = [
		{ label: "select story", value: "default" },
		...states
			.filter((d) => d.story)
			.map((d) => ({
				label: _.startCase(d.story),
				value: d.id
			}))
	];

	const methodology = () => {
		$revealMethods = true;
		const el = document.getElementById("methodology");
		if (!el) return;
		el.classList.toggle("visible");
		el.scrollIntoView({ behavior: "smooth", block: "start" });
	};
	const resetInputs = () => {
		selectState = "default";
		selectStory = "default";
	};

	$: orderOptions = [
		{ label: "Alphabetically", value: "alpha" },
		{ label: "Geographically", value: "geo", disabled: mobile },
		{ label: "Regionally", value: "region" },
		{ label: "By barriers", value: "barriers" }
	];
	$: mobile = $viewport.width < 600;
	$: if (selectState && selectState !== "default") $selectedState = selectState;
	$: if (selectStory && selectStory !== "default") $selectedState = selectStory;
	$: if (!$selectedState) resetInputs();
</script>

<div class="bar">
	<div class="selects">
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

	<button class="methods" on:click={methodology}>
		Methodology <span>{@html infoIcon}</span>
	</button>
</div>

<style>
	.bar {
		background: var(--color-tan);
		color: var(--color-dark-tan);
		font-size: 0.9rem;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		position: sticky;
		bottom: 0;
		z-index: 10;
		height: 70px;
		width: 100%;
	}
	.selects,
	.methods {
		display: flex;
		align-items: center;
	}
	.methods {
		background: none;
		padding: 0;
		color: var(--color-dark-tan);
	}
	.methods span {
		display: flex;
		width: 1.2rem;
		margin-left: 0.5rem;
	}
	.selects {
		gap: 1rem;
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
