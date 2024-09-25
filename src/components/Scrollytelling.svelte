<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import copy from "$data/copy.json";
	import logo from "$svg/wordmark-plain.svg";
	import maze from "$svg/intro-maze.svg";
	import { onMount } from "svelte";

	export let steps;

	let mounted = false;
	let value;

	const stepChange = () => {
		if (!mounted) return;
		const svgEl = document.querySelector("#intro-maze");
		if (!svgEl) return;

		if (value === 0) {
			svgEl.setAttribute("viewBox", "0 -600 257.5 872");
			const titleEls = svgEl.querySelectorAll("#of, #the");
			titleEls.forEach((el) => {
				el.setAttribute("opacity", 0);
			});
		} else if (value === 1) {
			svgEl.setAttribute("viewBox", "0 0 1030 872");
		}
	};

	$: visible = value === 0;
	$: value, stepChange();

	onMount(() => {
		mounted = true;
	});
</script>

<div class="byline" class:visible>
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

<!-- TODO: make this its own component with the svg inside -->
<div class="sticky">
	<div class="maze">
		{@html maze}
	</div>
</div>

<style>
	:global(#intro) {
		display: flex;
	}
	:global(#intro-maze) {
		height: auto;
	}
	.sticky {
		position: sticky;
		top: 0;
		flex: 1;
		height: fit-content;
		height: 100vh;
		display: flex;
		align-items: flex-end;
	}
	.maze {
		width: 100%;
	}

	.logo {
		max-width: 14em;
	}
	.logo a {
		border: none;
		display: block;
	}
	.logo a:hover :global(path#logo) {
		transition: fill 0.3s;
		fill: var(--color-fg);
	}
	.byline {
		opacity: 0;
		transition: opacity 0.5s;
		position: fixed;
		bottom: 4rem;
		left: 2rem;
	}
	.visible {
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
