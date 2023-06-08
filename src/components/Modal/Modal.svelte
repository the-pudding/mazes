<script>
	import Contents from "$components/Modal/Contents.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { selectedState } from "$stores/misc.js";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

	let modalEl;
	let numFocusable;
	let firstFocusable;
	let lastFocusable;

	$: open = $selectedState !== undefined;
	$: if (browser) document.body.classList.toggle("noscroll", open);

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

<svelte:body class:modal-open={true} />

<div
	class="modal"
	class:open
	bind:this={modalEl}
	tabindex="-1"
	on:keydown={trapFocus}
>
	<button class="close" on:click={close}><Icon name="x" /></button>

	<Contents />
</div>

<style>
	:global(body.noscroll) {
		overflow: hidden;
	}
	.modal {
		display: none;
		position: fixed;
		width: 90%;
		max-width: 1000px;
		height: 90vh;
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
		grid-template-rows: minmax(115px, 1fr) 3fr minmax(100px, 1fr);
		grid-template-columns: minmax(200px, 1fr) minmax(0, 1.3fr);
		grid-template-areas:
			"top top"
			"side main"
			"bottom bottom";
		gap: 2rem 1rem;
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

	@media (max-width: 600px) {
		.modal.open {
			display: flex;
			flex-direction: column;
			align-items: center;
		}
	}
</style>
