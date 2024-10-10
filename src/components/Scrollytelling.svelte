<script>
	import IntroMaze from "$components/IntroMaze.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import copy from "$data/copy.json";
	import logo from "$svg/wordmark-plain.svg";
	import { tweened } from "svelte/motion";
	import { cubicIn } from "svelte/easing";

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
		</div>
	{/each}
</Scrolly>
<div class="spacer" />

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
	}
	.logo {
		display: flex;
		max-width: 14em;
	}
	.logo a {
		border: none;
		display: block;
	}
	.logo a:hover :global(path#logo) {
		fill: var(--color-fg);
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
		color: var(--color-dark-tan);
	}
	:global(#intro .text a) {
		white-space: nowrap;
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
	}
	.step p {
		font-family: var(--serif);
		padding: 0 2rem 0 0;
		font-size: var(--32px);
		background: green;
	}
	.step:first-of-type {
		margin-top: -80vh;
	}
	.step:last-of-type {
		margin-bottom: 120vh;
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
