<script>
	import Facts from "$components/Modal/Facts.svelte";
	import { selectedState } from "$stores/misc.js";
	import stateData from "$data/states.csv";
	import factsData from "$data/facts.csv";
	import _ from "lodash";
	import shareIcon from "$svg/share.svg";
	import plusIcon from "$svg/plus-light.svg";
	import viewport from "$stores/viewport.js";

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

	$: mobile = $viewport.width < 600;
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
	$: guttmacherLink = state.guttmacher;
	$: facts = factsData
		.filter((d) => d.id === $selectedState)
		.map((d) => {
			if (!story) return d;
			return {
				...d,
				fact: d.fact.replace("NAME", _.startCase(story))
			};
		});
</script>

<div class="info">
	<div class="header">
		<div class="title">
			<h2>
				{name}
				{#if mobile}
					<span class="icon" on:click|preventDefault={share}
						>{@html shareIcon}

						<span class="clipboard" class:visible={copySuccess}
							>Copied to clipboard!</span
						>
					</span>
				{/if}
			</h2>
			{#if story}
				<div class="story">
					<span class="icon">{@html plusIcon}</span>
					{_.startCase(story)}'s story
				</div>
			{/if}
		</div>

		<div class="classification">
			{@html complexityText}
			{@html banText}
		</div>
	</div>

	<Facts {facts} />

	{#if !mobile}
		<div class="learn">
			<span>Learn more about this</span>
			<a href={guttmacherLink} target="_blank">state’s abortion policies</a>
			and
			<span class="share">
				<a href="#" on:click|preventDefault={share}>share this state’s maze</a>
				<span class="icon"
					>{@html shareIcon}

					<span class="clipboard" class:visible={copySuccess}
						>Copied to clipboard!</span
					>
				</span>
			</span>
		</div>
	{/if}
</div>

<style>
	.info {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-between;
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
	}
	.story {
		background: var(--color-accent-purple);
		color: var(--color-bg);
		border-radius: 5px;
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
		color: var(--color-dark-tan);
		font-size: 0.9rem;
		width: 520px;
	}
	.share {
		display: flex;
		align-items: center;
		position: relative;
	}
	.share .icon {
		display: flex;
		height: 20px;
		width: 20px;
		margin-left: 6px;
	}
	.story .icon {
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
		font-size: 1rem;
		font-family: var(--sans);
		font-weight: normal;
		position: absolute;
		top: 0;
		opacity: 0;
		transform: translate(0, 0);
		z-index: -1000;
		width: 100%;
		text-align: center;
		background: var(--color-bg);
		transition: transform calc(var(--1s) * 0.3), opacity calc(var(--1s) * 0.15);
	}
	.clipboard.visible {
		transform: translate(0, -120%);
		opacity: 1;
	}

	@media (max-width: 600px) {
		h2 {
			font-size: 2rem;
			margin: 0;
			margin-bottom: 0.5rem;
		}
		.story {
			font-size: 0.8rem;
		}
		.story .icon {
			height: 12px;
			width: 12px;
		}
		h2 .icon {
			position: relative;
			display: flex;
			height: 32px;
			width: 32px;
			margin-left: 0.5rem;
		}
		.classification {
			font-size: 0.9rem;
		}
		.info {
			gap: 0.5rem;
		}
		.clipboard {
			font-size: 0.8rem;
			width: auto;
			transform: translate(-50%, 0);
		}
		.clipboard.visible {
			transform: translate(-50%, -100%);
			opacity: 1;
		}
	}
</style>
