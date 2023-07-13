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
		<Icon name="share" />
	</button>

	<div class="clip" class:visible={showMessage}>Link copied to clipboard!</div>
</div>

<style>
	.share {
		display: inline-block;
		position: relative;
	}
	button {
		color: var(--color-pp-text-gray);
		font-family: var(--font-bold);
		display: flex;
		align-items: center;
		background: none;
		border-radius: 100%;
		font-size: 1.5rem;
	}
	button:hover {
		background: var(--color-gray-100);
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
			font-size: 1rem;
		}
		.clip {
			top: 20%;
		}
		.clip.visible {
			top: 60%;
		}
	}
</style>
