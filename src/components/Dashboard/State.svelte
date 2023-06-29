<script>
	import viewport from "$stores/viewport.js";
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";
	import _ from "lodash";

	export let id;
	export let label;
	export let row;
	export let col;
	export let ban;

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

	$: mobile = $viewport.width < 600;
	$: geo = $order === "geo" && !mobile;

	const onClick = (e) => {
		const id = e.target.id.replace("-state", "");
		$selectedState = id;
	};
	const onKeyDown = (e) => {
		if (e.keyCode === 13 || e.keyCode === 32) {
			const id = e.target.id;
			$selectedState = id;
		}
	};
</script>

<div
	class="state"
	class:geo
	id={`${id}-state`}
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
		<div class="abbrev" class:visible={true}>{label}</div>
	{/if}

	<div class="img-wrapper">
		<img
			src={`assets/img/states/${id}.png`}
			alt={`maze for ${id}`}
			class:hide={ban}
		/>
		{#if ban}<div class="black-box" />{/if}
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
	.state:hover {
		cursor: pointer;
		background: var(--color-pp-gray-1);
		transition: all 0.2s ease-in;
	}
	.state:focus {
		outline: 3px solid var(--color-pp-magenta);
		border-radius: 3px;
	}
	.state:focus .abbrev,
	.state:hover .abbrev {
		color: black;
		font-family: var(--font-heavy);
		text-transform: uppercase;
		transition: all 0.2s ease-in;
	}
	.abbrev {
		font-family: var(--sans);
		color: var(--color-pp-text-gray);
		text-align: center;
		pointer-events: none;
		white-space: nowrap;
		visibility: hidden;
	}
	.shortened {
		position: absolute;
		top: 0px;
		left: 50%;
		transform: translate(-50%, 0);
	}
	.abbrev.visible {
		visibility: visible;
	}
	img.hide {
		visibility: hidden;
	}
	.img-wrapper {
		position: relative;
		pointer-events: none;
	}
	.black-box {
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: black;
	}

	@media (max-width: 800px) {
		.state {
			font-size: 0.8rem;
			padding: 0.1rem;
		}
	}
</style>
