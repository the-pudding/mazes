<script>
	import Facts from "$components/Modal/Facts.svelte";
	import { selectedState } from "$stores/misc.js";
	import stateData from "$data/states.csv";
	import factsData from "$data/facts.csv";
	import _ from "lodash";
	import shareIcon from "$svg/share.svg";
	import plusIcon from "$svg/plus-light.svg";
	import viewport from "$stores/viewport.js";
	import Icon from "$components/helpers/Icon.svelte";

	export let sentences;

	const { complexitySentences, banSentences } = sentences;

	let t;
	let copySuccess = false;

	const share = () => {
		const baseUrl = window.location.origin + window.location.pathname;
		const shareUrl = `${baseUrl}?state=${encodeURIComponent($selectedState)}`;

		navigator.clipboard
			.writeText(shareUrl)
			.then(() => {
				clearTimeout(t);
				copySuccess = true;

				t = setTimeout(() => {
					copySuccess = false;
				}, 2000);
			})
			.catch((err) => {});
	};

	$: mobile = $viewport.width < 700;
	$: state = stateData.find((d) => d.id === $selectedState);
	$: name = _.startCase(state.name);
	$: story = state.story;
	$: complexity = state.complexity;
	$: complexityText =
		complexity === "most" || complexity === "least"
			? complexitySentences[0].value.replace("[COMPLEXITY]", complexity)
			: complexitySentences[1].value.replace("[COMPLEXITY]", complexity);
	$: ban = state.ban;
	$: banText =
		ban === "no restriction"
			? banSentences[0].value
			: ban === "banned"
			? banSentences[2].value
			: banSentences[1].value.replace("[LIMIT]", ban);
	$: facts = factsData
		.filter((d) => d.id === $selectedState)
		.map((d) => {
			if (!story) return d;
			return {
				...d,
				fact: d.fact.replaceAll("NAME", _.startCase(story))
			};
		});
</script>

<div class="info">
	<div class="header">
		<div class="title">
			<h2>
				{name}
			</h2>
			{#if story}
				<div class="story">
					<span class="plus-icon">{@html plusIcon}</span>
					{_.startCase(story)}'s story
				</div>
			{/if}

			{#if mobile}
				<span class="share-icon" on:click|preventDefault={share}
					><Icon name="share" stroke="#726D68" width="1.25rem" />
					<span class="clipboard" class:visible={copySuccess}>Link copied!</span
					>
				</span>
			{/if}
		</div>

		<div class="classification">
			{@html complexityText}
			{@html banText}
		</div>
	</div>

	<Facts {facts} />
</div>

<style>
	.info {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 1.5rem;
		height: 100%;
	}
	.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	h2 {
		font-family: var(--serif);
		font-weight: bold;
		font-size: 3rem;
		display: flex;
		align-items: center;
		margin: 0;
	}
	.story {
		background: var(--color-accent-purple);
		color: var(--color-bg);
		border-radius: 3px;
		padding: 6px 8px;
		font-weight: bold;
		display: flex;
		align-items: center;
		white-space: nowrap;
	}
	.learn {
		display: flex;
		flex-wrap: wrap;
		gap: 0 4px;
		align-items: baseline;
		color: var(--color-tan);
		font-size: 0.9rem;
		z-index: 1000;
	}
	.share {
		display: flex;
		align-items: center;
		position: relative;
	}
	.share-icon {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 20px;
		width: 20px;
		margin-left: 6px;
	}
	.plus-icon {
		display: flex;
		height: 16px;
		width: 16px;
		margin-right: 6px;
	}
	a {
		line-height: 1;
	}
	span,
	a {
		white-space: nowrap;
	}
	.clipboard {
		font-size: var(--12px);
		font-family: var(--sans);
		font-weight: 600;
		position: absolute;
		top: 0;
		left: 50%;
		width: 100px;
		opacity: 0;
		transform: translate(-50%, 0);
		z-index: -1000;
		text-align: center;
		background: var(--color-bg);
		border: 1px solid var(--color-dark-tan);
		color: var(--color-fg);
		padding: 0.25rem;
		border-radius: 3px;
		transition: transform calc(var(--1s) * 0.3), opacity calc(var(--1s) * 0.15);
	}
	.clipboard.visible {
		transform: translate(-50%, -110%);
		opacity: 1;
	}

	:global(
			h2 .icon:hover svg path,
			h2 .icon:hover svg polyline,
			h2 .icon:hover svg line
		) {
		stroke: var(--color-fg);
	}
	:global(
			.share:hover .icon svg path,
			.share:hover .icon svg polyline,
			.share:hover .icon svg line
		) {
		stroke: var(--color-fg);
	}

	@media (max-width: 700px) {
		.header {
			width: calc(100% - 2rem);
		}
		.title {
			margin-bottom: 0.5rem;
		}
		h2 {
			font-size: 2rem;
			margin: 0;
		}
		.story {
			font-size: 0.8rem;
		}
		.plus-icon {
			height: 12px;
			width: 12px;
		}
		.share-icon {
			background: var(--color-tan);
			width: 36px;
			height: 36px;
			border-radius: 50%;
			display: flex;
		}
		:global(
				.share-icon svg path,
				.share-icon svg polyline,
				.share-icon svg line
			) {
			stroke: var(--color-fg);
		}
		.share-icon:hover {
			background: var(--color-dark-tan);
			cursor: pointer;
		}
		.classification {
			font-size: 0.9rem;
		}
		.info {
			gap: 0.5rem;
		}
	}

	@media (max-width: 600px) {
		.clipboard.visible {
			transform: translate(-50%, -50%);
			z-index: 100;
		}
	}

	@media (max-width: 500px) {
		h2 {
			font-size: 1.75rem;
		}
	}
</style>
