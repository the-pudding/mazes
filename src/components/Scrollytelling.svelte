<script>
	import IntroMaze from "$components/IntroMaze.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import copy from "$data/copy.json";
	import logo from "$svg/wordmark-plain.svg";

	export let steps;

	let value;

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

<div class="steps">
	<Scrolly bind:value>
		{#each steps as { value }, i}
			<div class="step">
				<p>{@html value}</p>
			</div>
		{/each}
	</Scrolly>
</div>

<div class="sticky">
	<IntroMaze step={value} />
</div>

<style>
	:global(#intro) {
		display: flex;
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
	}
	.byline.visible {
		opacity: 1;
	}
	.text {
		display: block;
		color: var(--color-dark-tan);
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
</style>
