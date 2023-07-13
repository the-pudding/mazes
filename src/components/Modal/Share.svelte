<script>
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import { selectedState } from "$stores/misc.js";
	import Clipboard from "clipboard";
	import { onMount } from "svelte";

	let showMessage = false;

	$: if (!$selectedState) showMessage = false;

	onMount(() => {
		const clipboard = new Clipboard(".copy-btn");
		clipboard.on("success", function (e) {
			showMessage = true;
			setTimeout(() => {
				showMessage = false;
			}, 3000);
		});
	});
</script>

<div class="share">
	<button
		class="copy-btn"
		data-clipboard-text={`${copy.url}/?state=${$selectedState}`}
	>
		SHARE <div class="circle"><Icon name="share" /></div>
	</button>

	<div class="clip" class:visible={showMessage}>Link copied to clipboard!</div>
</div>

<style>
	.share {
		position: relative;
	}
	button {
		color: var(--color-pp-text-gray);
		font-family: var(--font-bold);
		display: flex;
		align-items: center;
		background: none;
	}
	button:hover {
		background: var(--color-gray-100);
	}
	button:hover .circle {
		background: var(--color-pp-navy);
	}
	.circle {
		height: 42px;
		width: 42px;
		background: var(--color-pp-light-navy);
		color: white;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 0.5rem;
	}
	.clip {
		position: absolute;
		top: -90%;
		opacity: 0;
		text-align: center;
		font-size: 0.8rem;
		transition: all calc(var(--1s) * 0.5) ease-in-out;
		pointer-events: none;
	}
	.clip.visible {
		opacity: 1;
		top: -100%;
	}
	@media (max-width: 600px) {
		button {
			font-size: 0.8rem;
			padding-top: 0;
			padding-bottom: 0;
		}
		.clip {
			top: 20%;
		}
		.clip.visible {
			top: 60%;
		}
	}
</style>
