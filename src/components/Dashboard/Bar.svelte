<script>
	import Select from "$components/helpers/Select.svelte";
	import states from "$data/states.csv";
	import { getContext } from "svelte";
	import { selectedState, revealMethods } from "$stores/misc.js";
	import viewport from "$stores/viewport.js";
	import mq from "$stores/mq.js";
	import _ from "lodash";
	import infoIcon from "$svg/info.svg";

	const { getOrder } = getContext("dashboard");
	const order = getOrder();

	let selectState = "default";

	const highlightOptions = [
		{ label: "select state", value: "default" },
		...states.map((d) => ({ label: _.startCase(d.name), value: d.id }))
	];

	const methodology = () => {
		if ($revealMethods) return;
		$revealMethods = true;
		const el = document.getElementById("methodology");
		if (!el) return;
		el.classList.toggle("visible");
		el.scrollIntoView({
			behavior: $mq.reducedMotion ? "instant" : "smooth",
			block: "start"
		});
	};
	const resetInputs = () => {
		selectState = "default";
	};

	$: orderOptions = [
		{ label: "Alphabetically", value: "alpha" },
		{ label: "Geographically", value: "geo" },
		{ label: "Regionally", value: "region" },
		{ label: "By barriers", value: "barriers" }
	].filter((d) => (mobile ? d.value !== "geo" : d));
	$: mobile = $viewport.width < 600;
	$: if (selectState && selectState !== "default") $selectedState = selectState;
	$: if (!$selectedState) resetInputs();
</script>

<div class="bar" class:fade={$selectedState}>
	<div class="selects">
		<div class="select">
			<Select label={"Sort"} options={orderOptions} bind:value={$order} />
		</div>

		<div class="select">
			<Select
				label={"Go to"}
				options={highlightOptions}
				bind:value={selectState}
			/>
		</div>
	</div>

	<button class="methods" on:click={methodology}>
		{$viewport.width < 620 && !mobile ? "" : "Methodology"}
		<span>{@html infoIcon}</span>
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
		transition: opacity calc(var(--1s) * 0.3);
	}
	.bar.fade {
		opacity: 0.2;
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
	.methods:hover {
		color: var(--color-fg);
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
			height: auto;
			flex-direction: column;
			align-items: center;
			font-size: 0.8rem;
		}
		.selects {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			margin-bottom: 0.5rem;
		}
	}
</style>
