<script>
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import states from "$data/states.csv";
	import { selectedState, language } from "$stores/misc.js";
	import Clipboard from "clipboard";
	import { onMount } from "svelte";
	import _ from "lodash";

	let showMessage = false;

	$: if (!$selectedState) showMessage = false;
	$: link = `${copy.url}/?state=${$selectedState}`;
	$: copyText = copy.shareNote[$language]
		.replace(
			"[state]",
			`${
				$selectedState === "dc"
					? `${$language === "english" ? "the" : "el"} `
					: ""
			}${_.startCase(states.find((d) => d.id === $selectedState)?.name)}`
		)
		.replace("[link]", link);

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
	<div class="click">
		<button class="copy-btn" data-clipboard-text={copyText}>
			<Icon name="share" />
		</button>
		<div class="message" class:visible={showMessage}>Copied to clipboard!</div>
	</div>

	<div class="text">
		<div class="label" class:visible={!showMessage}>Share</div>
	</div>
</div>

<style>
	.share {
		display: flex;
		align-items: center;
		position: relative;
		margin-left: 10px;
		font-weight: normal;
		font-family: var(--sans);
	}
	button {
		color: var(--color-pp-gray-3);
		font-family: var(--font-bold);
		display: flex;
		align-items: center;
		background: #f9f7f4;
		border-radius: 100%;
		font-size: 1.5rem;
	}
	button:hover {
		background: var(--color-gray-200);
	}
	.text {
		color: var(--color-pp-text-gray);
		position: relative;
		font-size: 0.9rem;
		pointer-events: none;
		margin-left: 8px;
	}
	.label {
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.3);
	}
	.click {
		position: relative;
	}
	.message {
		color: var(--color-pp-text-gray);
		position: absolute;
		top: 0;
		left: 0;
		transform: translate(0%, -120%);
		font-size: 0.75rem;
		opacity: 0;
		transition: all calc(var(--1s) * 0.3);
	}
	.visible {
		opacity: 1;
	}
	.message.visible {
		transform: translate(0%, -110%);
	}
	@media (max-width: 600px) {
		button {
			font-size: 1rem;
		}
		.text {
			display: none;
		}
	}
</style>
