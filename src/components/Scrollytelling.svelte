<script>
	import IntroMaze from "$components/IntroMaze.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import logo from "$svg/wordmark-plain.svg";

	export let steps;

	let value;

	// TODO: 900px, switch to steps on top

	$: bylineVisible = value === 0;
</script>

<div class="byline" class:visible={bylineVisible}>
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

<Scrolly bind:value>
	{#each steps as { value }, i}
		<div class="step">
			<p>{@html value}</p>
			{#if i == 0}
				<div class="icon-wrapper">
					<Icon name="arrow-down-circle" width="2.5rem" height="2.5rem" stroke="#726D68" strokeWidth="1" />
					<p>Scroll</p>
				</div>
			{:else if i == steps.length-1}
				<div class="icon-wrapper">
					<Icon name="arrow-down-circle" width="2.5rem" height="2.5rem" stroke="#726D68" strokeWidth="1" />
					<p>Scroll</p>
				</div>
			{/if}
		</div>
	{/each}
</Scrolly>

<style>
	:global(#intro) {
		position: relative;
	}
	#fake-line {
		position: fixed;
		background: var(--color-accent-purple);
		left: 0;
		width: 0;
		height: 32px;
		opacity: 1;
		transition: top 1800ms cubic-bezier(0.55, 0.06, 0.68, 0.19), 
                height 1800ms cubic-bezier(0.55, 0.06, 0.68, 0.19);
	}
	#fake-line.visible {
		opacity: 1;
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
	:global(#intro .text a) {
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
	.step:last-of-type {
		margin-bottom: 20vh;
	}

	.step:last-of-type p {
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
			height: auto;
			top: 50%;
			transform: translate(0, -50%);
		}
		.steps {
			z-index: 100;
			width: 100%;
			padding: 0 2rem;
		}
		.step {
			width: 250px;
			font-size: 1.25rem;
			padding: 0.5rem 1.5rem;
			background: var(--color-bg);
			border: 1px solid var(--color-dark-tan);
		}
	}
</style>
