<script>
	import IntroMaze from "$components/IntroMaze.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
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

<div class="steps">
	<Scrolly bind:value>
		{#each steps as { value }, i}
			<div class="step">
				<p>{@html value}</p>
			</div>
		{/each}
	</Scrolly>
</div>

<style>
	:global(#intro) {
		display: flex;
		flex-direction: row-reverse;
		gap: 1rem;
		padding-right: 0 !important;
	}
	.sticky {
		position: sticky;
		top: 0;
		flex: 1;
		height: fit-content;
		height: 100vh;
		display: flex;
		align-items: center;
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
		transition: opacity 0.5s;
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
	.steps {
		width: 350px;
	}
	.step {
		font-family: var(--serif);
		font-size: 2rem;
		margin: 80vh 0;
	}
	.step:first-of-type {
		margin-top: 12rem;
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
			font-size: 1.25rem;
			padding: 0.5rem 1.5rem;
			background: var(--color-bg);
			border: 1px solid var(--color-dark-tan);
		}
	}
</style>
