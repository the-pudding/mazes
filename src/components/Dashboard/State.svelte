<script>
	import viewport from "$stores/viewport.js";
	import { getContext } from "svelte";
	import { selectedState } from "$stores/misc.js";

	export let id;
	export let label;
	export let row;
	export let col;

	const { getOrder } = getContext("dashboard");
	const order = getOrder();

	$: mobile = $viewport.width < 600;
	$: geo = $order === "geo" && !mobile;

	const onClick = (e) => {
		const id = e.target.id;
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
	{id}
	style={row && col ? `--row: ${row}; --col: ${col}` : null}
	on:click={onClick}
	on:keydown={onKeyDown}
	role="button"
	tabindex="0"
>
	<div class="abbrev">{label}</div>
	<img src={"assets/img/iowa-100.png"} />
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
	}
	.abbrev {
		font-family: var(--sans);
		color: var(--color-pp-text-gray);
		text-align: center;
		pointer-events: none;
	}
	img {
		pointer-events: none;
	}

	@media (max-width: 800px) {
		.state {
			font-size: 0.8rem;
		}
	}
</style>
