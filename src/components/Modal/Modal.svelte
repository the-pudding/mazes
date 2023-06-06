<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { selectedState } from "$stores/misc.js";
	import states from "$data/states.csv";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import data from "$data/iowa.json";

	let modalEl;
	let numFocusable;
	let firstFocusable;
	let lastFocusable;

	$: open = $selectedState !== undefined;
	$: if (browser) document.body.classList.toggle("noscroll", open);
	$: state = states.find((d) => d.id === $selectedState)?.name;

	const close = () => {
		$selectedState = undefined;
	};
	const trapFocus = (e) => {
		const tabPressed = e.key === "Tab" || e.keyCode === 9;
		if (!tabPressed) return;

		if (e.shiftKey) {
			if (document.activeElement === firstFocusable) {
				lastFocusable.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastFocusable) {
				firstFocusable.focus();
				e.preventDefault();
			}
		}
	};

	onMount(() => {
		const focusable = modalEl.querySelectorAll(
			"a[href], button, textarea, input[type='text'], input[type='radio'], input[type='checkbox'], select"
		);
		numFocusable = focusable.length;
		firstFocusable = focusable[0];
		lastFocusable = focusable[numFocusable - 1];
	});
</script>

<div
	class="modal"
	class:open
	bind:this={modalEl}
	tabindex="-1"
	on:keydown={trapFocus}
>
	<button class="close" on:click={close}><Icon name="x" /></button>
	<div class="title">
		<h2>{state}</h2>
		<div>
			...is one of the <strong>most restrictive</strong> states for abortion access.
		</div>
	</div>

	<div class="play">
		<div class="facts">make this into a component</div>
		<div class="maze" style="background: pink">
			this is a maze
			<!-- <Maze wallData={data} size={data.length} playable={true} /> -->
		</div>
	</div>
</div>

<svelte:body class:modal-open={true} />

<style>
	:global(body.noscroll) {
		overflow: hidden;
	}
	.modal {
		display: none;
		position: fixed;
		width: 90%;
		max-height: 90vh;
		margin: 4em auto;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		background: white;
		border: 1px solid var(--color-pp-gray-1);
		box-shadow: 0px 5px 10px rgba(232, 229, 225, 0.5);
		padding: 2rem;
	}
	.modal.open {
		z-index: 10;
		display: grid;
		grid-template-rows: 1fr 3fr 1fr;
		grid-template-columns: 1fr 2fr;
	}
	.play {
		/* display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 3rem; */
	}
	.title {
		background: cornflowerblue;
	}
	h2 {
		font-weight: 900;
		font-size: 3rem;
	}
	.title div {
		font-size: 1.3rem;
	}
	.close {
		display: flex;
		border-radius: 100%;
		background: var(--color-pp-gray-1);
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
	.close:hover {
		background: var(--color-pp-gray-2);
	}
</style>
