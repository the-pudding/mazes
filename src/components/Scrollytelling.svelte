<script>
	import { onMount } from "svelte";
	import IntroMaze from "$components/IntroMaze.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import logo from "$svg/wordmark-plain.svg";
	import viewport from "$stores/viewport.js";

	export let steps;

	let value;

	$: bylineVisible = value === 0;
	$: mobile = $viewport.width < 900;
</script>

<div class="byline" class:visible={bylineVisible} class:mobile>
	<span class="logo">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self">
			{@html logo}
		</a>
	</span>
	<span class="text">{@html copy.byline}</span>
</div>

<div class="sticky">
	<IntroMaze step={value} />
</div>
<div class="steps">
	<Scrolly bind:value>
		{#each steps as { value }, i}
			<div class="step" id="step-{i}">
				<p>{@html value}</p>
				{#if i == 0 || i == steps.length - 1}
					<div class="icon-wrapper">
						<Icon
							name="arrow-down-circle"
							width={mobile ? "2rem" : "2.5rem"}
							height={mobile ? "2rem" : "2.5rem"}
							stroke="#726D68"
							strokeWidth="1"
						/>
						<p>Scroll</p>
					</div>
				{/if}
			</div>
		{/each}

		<div class="extra step" />
	</Scrolly>
</div>

<style>
	:global(#intro) {
		position: relative;
	}
	.sticky {
		width: 100%;
		height: 100svh;
		position: sticky;
		display: flex;
		flex-direction: column;
		top: 0;
		transition: all 1s;
		z-index: 1;
		overflow: hidden;
		pointer-events: none;
	}
	.logo {
		display: flex;
		max-width: 10em;
	}
	.logo a {
		border: none;
		display: block;
	}
	.logo a:hover {
		transform: rotate(-2deg);
	}
	.byline {
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.5);
		position: fixed;
		bottom: 4rem;
		left: 2rem;
		width: 350px;
	}
	.byline.visible {
		opacity: 1;
	}
	.text {
		display: block;
		color: var(--color-fg);
	}
	.mobile .text {
		display: none;
	}
	.byline.mobile {
		position: fixed;
		top: 1rem;
		left: 50%;
		transform: translate(-50%, 0);
		width: fit-content;
	}

	:global(#intro .text a, #intro .authors-mobile a) {
		white-space: nowrap;
		color: var(--color-fg);
	}
	:global(#intro .text a:hover) {
		color: var(--color-accent-purple);
	}
	.spacer {
		height: 75vh;
	}
	.step {
		height: 100vh;
		text-align: left;
		z-index: 1000;
		width: 350px;
		margin: 0;
		padding: 0 0 0 1.5rem;
		pointer-events: none;
	}
	.step p {
		font-family: var(--serif);
		padding: 0 2rem 0 0;
		font-size: var(--32px);
		pointer-events: auto;
		position: relative;
	}
	.extra {
		visibility: hidden;
		height: 50vh;
	}
	.icon-wrapper {
		display: flex;
		align-items: center;
		transform: translateY(0);
		animation: bounce 0.7s ease-in-out infinite;
	}
	.icon-wrapper p {
		font-family: var(--sans);
		font-size: var(--12px) !important;
		font-weight: 500 !important;
		text-transform: uppercase;
		color: var(--color-dark-tan);
		padding: 0 0 0 0.5rem;
	}
	.step:first-of-type {
		margin-top: -80vh;
	}
	.step:nth-last-of-type(2) p {
		font-weight: 700;
		font-size: var(--56px);
	}

	@keyframes bounce {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
		100% {
			transform: translateY(0);
		}
	}

	@media (min-width: 1200px) {
		.step:last-of-type {
			font-size: 4.5rem;
		}
	}

	@media (max-width: 900px) {
		:global(#intro) {
			flex-direction: column;
			gap: 0;
			align-items: center;
			padding: 0 !important;
		}
		.sticky {
			width: 100%;
		}
		.steps {
			z-index: 100;
			width: 100%;
			padding: 0 2rem;
		}
		.step {
			margin: 80vh auto;
			max-width: 600px;
			width: auto;
			height: auto;
			font-size: 1.25rem;
			padding: 0.5rem 1.5rem;
			background: var(--color-bg);
			border: 1px solid var(--color-dark-tan);
		}
		.step:nth-last-of-type(2) {
			margin-bottom: 120vh;
		}
		.step p {
			padding: 0;
		}
		.icon-wrapper p {
			padding: 0 0 0 0.125rem;
		}
	}

	@media (max-width: 600px) {
		.steps {
			padding: 0 1rem;
		}
		.step {
			margin: 70vh auto;
		}
		.step p {
			font-size: var(--24px);
		}

		.step:nth-last-of-type(2) p {
			font-size: var(--48px);
		}
	}

	@media (max-width: 400px) {
		.step {
			padding: 0.5rem 1rem;
		}
		.step p {
			font-size: var(--18px);
		}
		.step:nth-last-of-type(2) p {
			font-size: var(--36px);
		}
	}
</style>
