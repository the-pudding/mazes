<script>
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";
	import states from "$data/states.csv";
	import plusIcon from "$svg/plus.svg";

	export let id;
	export let label;
	export let row;
	export let col;
	export let story;

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
		{ id: "wa", shortened: "Wash." },
		{ id: "tn", shortened: "Tenn." }
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
	<div class="abbrev">
		{#if longNames.find((d) => d.id === id)}
			<div
				class="text"
				bind:clientWidth={labelWidth}
				class:visible={labelWidth <= $columnWidth}
			>
				{label}
			</div>
			<div class="shortened text" class:visible={labelWidth > $columnWidth}>
				{longNames.find((d) => d.id === id).shortened}
			</div>
		{:else}
			<div class="text visible">{label}</div>
		{/if}

		{#if story}
			<span class="icon">{@html plusIcon}</span>
		{/if}
	</div>

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
	.state:hover {
		cursor: pointer;
		outline: 3px solid var(--color-accent-orange);
		border-radius: 5px;
	}
	.state:hover .abbrev {
		font-weight: bold;
		color: var(--color-fg);
	}
	.state.geo {
		grid-row: var(--row);
		grid-column: var(--col);
	}
	.abbrev {
		position: relative;
		font-family: var(--sans);
		color: var(--color-dark-tan);
		text-align: center;
		pointer-events: none;
		white-space: nowrap;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		width: 100%;
	}
	.text {
		grid-column: 2;
		text-align: center;
		visibility: hidden;
	}
	.icon {
		height: 14px;
		width: 14px;
		display: grid;
		grid-column: 3;
		justify-self: end;
	}
	.visible {
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
