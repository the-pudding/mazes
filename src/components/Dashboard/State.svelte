<script>
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import states from "$data/states.csv";

	export let id;
	export let label;
	export let row;
	export let col;

	const { getOrder, getColumnWidth } = getContext("dashboard");
	const order = getOrder();
	const columnWidth = getColumnWidth();

	const longNames = [
		{ id: "dc", shortened: "D.C." },
		{ id: "nc", shortened: "N. Carolina" },
		{ id: "sc", shortened: "S. Carolina" },
		{ id: "wv", shortened: "W. Virginia" },
		{ id: "nm", shortened: "N. Mexico" },
		{ id: "ma", shortened: "Mass." },
		{ id: "nh", shortened: "New Hamp." },
		{ id: "nd", shortened: "N. Dakota" },
		{ id: "sd", shortened: "S. Dakota" },
		{ id: "pa", shortened: "Penn." },
		{ id: "ri", shortened: "Rhode I." },
		{ id: "ct", shortened: "Conn." },
		{ id: "wa", shortened: "Wash." }
	];
	let labelWidth;

	$: geo = $order === "geo";

	const onClick = (e) => {
		const id = e.target.id.replace("-state", "");
		$selectedState = id;
	};
	const onKeyDown = (e) => {
		if (e.keyCode === 13 || e.keyCode === 32) {
			const id = e.target.id.replace("-state", "");
			$selectedState = id;
		}
	};
</script>

<div
	class="state"
	class:geo
	{id}
	style={row && col ? `--row: ${row}; --col: ${col}` : null}
	on:click={onClick}
	on:keydown={onKeyDown}
	role="button"
	tabindex="0"
>
	{#if longNames.find((d) => d.id === id)}
		<div
			class="abbrev"
			bind:clientWidth={labelWidth}
			class:visible={labelWidth <= $columnWidth}
		>
			{label}

			<div class="shortened abbrev" class:visible={labelWidth > $columnWidth}>
				{longNames.find((d) => d.id === id).shortened}
			</div>
		</div>
	{:else}
		<div class="abbrev visible">
			{label}
		</div>
	{/if}

	<div class="img-wrapper">
		<img
			src={`assets/img/states/${id}.png`}
			alt={`maze for ${states.find((d) => d.id === id).name}`}
		/>
	</div>
</div>

<style>
	.state {
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-row: auto;
		grid-column: auto;
		padding: 0.25rem;
	}
	.state.geo {
		grid-row: var(--row);
		grid-column: var(--col);
	}
	.abbrev {
		font-family: var(--sans);
		color: #b0a380;
		text-align: center;
		pointer-events: none;
		white-space: nowrap;
		visibility: hidden;
	}
	.abbrev.visible {
		visibility: visible;
	}
	.shortened {
		position: absolute;
		top: 0px;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.img-wrapper {
		position: relative;
		pointer-events: none;
		width: 100%;
	}

	@media (max-width: 800px) {
		.state {
			font-size: 0.8rem;
			padding: 0.1rem;
		}
	}
</style>
