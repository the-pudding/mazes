<script>
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import { selectedState } from "$stores/misc.js";

	let showMessage = false;

	$: if (!$selectedState) showMessage = false;

	const share = () => {
		const str = `${copy.url}/?state=${$selectedState}`;
		navigator.clipboard.writeText(str);

		showMessage = true;
		setTimeout(() => {
			showMessage = false;
		}, 3000);
	};
</script>

<div class="share">
	<button on:click={share}>
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
	}
	.clip.visible {
		opacity: 1;
		top: -100%;
	}
</style>
