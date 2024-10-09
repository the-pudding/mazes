<script>
	import Contents from "$components/Modal/Contents.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { selectedState, globalGameState } from "$stores/misc.js";
	import { browser } from "$app/environment";
	import { tick } from "svelte";
	import states from "$data/states.csv";
	import viewport from "$stores/viewport.js";

	export let sentences;

	let modalEl;
	let stateEl;
	let numFocusable;
	let firstFocusable;
	let lastFocusable;

	$: open = $selectedState !== undefined;
	$: ban =
		$selectedState &&
		states.find((d) => d.id === $selectedState).ban === "true";
	$: if (browser) document.body.classList.toggle("noscroll", open);
	$: if (open && modalEl) focusModal();
	$: if (!open && stateEl) focusState();
	$: mobile = $viewport.width < 600;
	$: mobile, $globalGameState, getFocusable();

	const focusModal = async () => {
		await tick();
		await getFocusable();
		modalEl.focus();
		stateEl = document.querySelector(`.state#${$selectedState}-state`);
	};
	const focusState = () => {
		stateEl.focus();
		stateEl = undefined;
	};
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
	const getFocusable = async () => {
		if (!modalEl) return;

		await tick();
		const focusable = Array.from(
			modalEl.querySelectorAll(
				"a[href], button, textarea, input[type='text'], input[type='radio'], input[type='checkbox'], select"
			)
		).filter((d) => !d.disabled);

		numFocusable = focusable.length;
		firstFocusable = focusable[0];
		lastFocusable = focusable[numFocusable - 1];
	};
</script>

<!-- <svelte:body class:modal-open={true} /> -->

<div
	class="modal"
	class:open
	class:ban
	bind:this={modalEl}
	tabindex="-1"
	on:keydown={trapFocus}
>
	<button class="close" on:click={close} aria-label="close"
		><Icon name="x" /></button
	>
	<Contents {sentences} />
</div>

<style>
	:global(body.noscroll) {
		overflow: hidden;
	}
	.modal {
		opacity: 0;
		z-index: -1000;
		transition: opacity calc(var(--1s) * 0.3);
		display: flex;
		flex-direction: column;
		position: fixed;
		width: 90%;
		max-width: 1000px;
		height: calc(100vh - 6rem);
		margin: 3rem 0;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		background: var(--color-bg);
		border: 1px solid var(--color-dark-tan);
		box-shadow: 0px 5px 10px rgba(232, 229, 225, 0.5);
		padding: 3rem;
	}
	.modal.open {
		z-index: 1000;
		opacity: 1;
	}
	.close {
		display: flex;
		border-radius: 100%;
		background: var(--color-tan);
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(50%, -50%);
	}
	.close:hover {
		background: var(--color-dark-tan);
	}

	@media (max-width: 600px) {
		.modal {
			padding: 1.5rem;
			margin: 1.5rem 0;
			height: calc(100vh - 3rem);
		}
		.modal.open {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
	@media (max-height: 830px) {
		.modal {
			overflow: scroll;
		}
		.close {
			transform: translate(-8px, 8px);
		}
	}
</style>
