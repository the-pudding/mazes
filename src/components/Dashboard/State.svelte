<script>
	import Illinois from "$components/Dashboard/Illinois.svelte";
	import viewport from "$stores/viewport.js";
	import { getContext } from "svelte";
	import { selectedState, scrollStep } from "$stores/misc.js";
	import _ from "lodash";

	export let id;
	export let label;
	export let row;
	export let col;
	export let ban;

	const { intro, getOrder, getColumnWidth, getIsZoomedIn } =
		getContext("dashboard");
	const order = getOrder();
	const columnWidth = getColumnWidth();
	const isZoomedIn = getIsZoomedIn();

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
	$: geo = ($order === "geo" && !mobile) || intro;
	$: showAbbrevs = (intro && !$isZoomedIn) || !intro;
	$: faded = id !== "il" && intro && $isZoomedIn;

	const onClick = (e) => {
		if (!intro) {
			const id = e.target.id.replace("-state", "");
			$selectedState = id;
		}
	};
	const onKeyDown = (e) => {
		if (!intro) {
			if (e.keyCode === 13 || e.keyCode === 32) {
				const id = e.target.id.replace("-state", "");
				$selectedState = id;
			}
		}
	};
</script>

<div
	class="state"
	class:geo
	class:interactive={!intro}
	class:intro
	class:faded
	id={intro ? `${id}-intro` : `${id}-state`}
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
			class:visible={showAbbrevs && labelWidth <= $columnWidth}
		>
			{label}

			<div class="shortened abbrev" class:visible={labelWidth > $columnWidth}>
				{longNames.find((d) => d.id === id).shortened}
			</div>
		</div>
	{:else}
		<div class="abbrev" class:visible={showAbbrevs}>
			{label}
		</div>
	{/if}

	<div class="img-wrapper">
		{#if intro && id === "il"}
			<Illinois />
		{:else}
			<img
				src={`assets/img/states/${id}.png`}
				alt={`maze for ${id}`}
				class:hide={ban}
			/>
		{/if}

		<div class="fill" class:ban />
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
		transition: all calc(var(--1s) * 0.3) ease-in-out;
	}
	.state.faded {
		opacity: 0.1;
	}
	.state.geo {
		grid-row: var(--row);
		grid-column: var(--col);
	}
	.state.interactive:hover {
		cursor: pointer;
	}
	.state.interactive:focus {
		outline: 3px solid var(--color-pp-magenta);
		border-radius: 3px;
	}
	.state.interactive:focus .abbrev,
	.state.interactive:hover .abbrev {
		color: black;
		font-family: var(--font-heavy);
		font-weight: 900;
		transition: all 0.2s ease-in;
	}
	.abbrev {
		font-family: var(--sans);
		color: var(--color-pp-text-gray);
		text-align: center;
		pointer-events: none;
		white-space: nowrap;
		visibility: hidden;
		transition: opacity calc(var(--1s) * 0.3) ease-in-out;
	}
	.intro .abbrev {
		visibility: visible;
		opacity: 0;
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
	.intro .abbrev.visible {
		opacity: 1;
	}
	img.hide {
		visibility: hidden;
	}
	.img-wrapper {
		position: relative;
		pointer-events: none;
		width: 100%;
	}
	.fill {
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: var(--color-pp-gray-1);
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.1);
	}
	.state.interactive:hover .fill {
		opacity: 0.5;
	}
	.ban {
		background: black;
		opacity: 1;
		visibility: visible;
	}

	@media (max-width: 800px) {
		.state {
			font-size: 0.8rem;
			padding: 0.1rem;
		}
	}
	@media (max-width: 600px) {
		.intro .abbrev {
			font-size: 0.5rem;
		}
	}
</style>
