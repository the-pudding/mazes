<script>
	import Play from "$components/Modal/Play.svelte";
	import Facts from "$components/Modal/Facts.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import { selectedState } from "$stores/misc.js";
	import copy from "$data/copy.json";
	import states from "$data/states.csv";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";

	let modalEl;
	let numFocusable;
	let firstFocusable;
	let lastFocusable;

	const { modalNote } = copy;

	$: open = $selectedState !== undefined;
	$: if (browser) document.body.classList.toggle("noscroll", open);
	$: state = states.find((d) => d.id === $selectedState)?.name;
	$: guttmacherLink = states.find((d) => d.id === $selectedState)?.guttmacher;

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

	<div class="facts">
		<Facts />
	</div>
	<div class="play">
		<Play />
	</div>

	<div class="bottom">
		<div class="left">
			<a href={guttmacherLink} target="_blank"
				>Read more about {state}'s abortion policies
				<span><Icon name="external-link" /></span></a
			>
			<div class="note">
				{@html modalNote}
			</div>
		</div>

		<div class="share">
			SHARE <button><Icon name="share" /></button>
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
		gap: 2rem 0.5rem;
	}
	.title {
		grid-area: top;
	}
	.facts {
		grid-area: side;
	}
	.play {
		grid-area: main;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.bottom {
		grid-area: bottom;
		color: var(--color-pp-text-gray);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left {
		max-width: 600px;
		margin-right: 3rem;
	}
	.left a {
		color: var(--color-pp-text-gray);
	}
	.left a:hover {
		color: black;
	}
	.left a span {
		font-size: 0.65rem;
	}
	h2 {
		font-weight: 900;
		font-size: 3rem;
		margin-bottom: 0;
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
	.note {
		margin-top: 1rem;
	}
	.share {
		color: var(--color-pp-text-gray);
		font-weight: 700;
		display: flex;
		align-items: center;
	}
	.share button {
		background: var(--color-pp-light-navy);
		color: white;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 0.5rem;
	}
	.share button:hover {
		background: var(--color-pp-text-gray);
	}
</style>
