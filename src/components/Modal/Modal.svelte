<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { selectedState } from "$stores/misc.js";
	import states from "$data/states.csv";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

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

	$: console.log({ firstFocusable, lastFocusable, numFocusable });

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
	<h2>{state}</h2>

	<!-- <div class="play">
		<div>Info tk</div>
		<Maze playable={true} />
	</div> -->
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
		display: block;
		z-index: 10;
	}
	.play {
		display: grid;
		grid-template-columns: 200px 1fr;
	}
	h2 {
		font-weight: 900;
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
