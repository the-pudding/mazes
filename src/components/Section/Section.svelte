<script>
	import Prose from "$components/Section/Prose.svelte";
	import Slide from "$components/Section/Slide.svelte";
	import { language } from "$stores/misc.js";
	import _ from "lodash";

	export let title;
	export let chunks;

	$: id = _.kebabCase(title.english).replaceAll("-strong", "");

	const components = { Prose, Slide };
</script>

<section {id}>
	<h2>{@html title[$language]}</h2>

	{#each chunks as { type, component, maze, align, text, before, after, panels }}
		<svelte:element this={type} class="chunk">
			<svelte:component
				this={components[component]}
				{maze}
				{align}
				{text}
				{before}
				{after}
				{panels}
			/>
		</svelte:element>
	{/each}
</section>

<style>
	section {
		max-width: 1000px;
		margin: 0 auto;
		padding: 0 4rem;
	}
	h2 {
		font-size: 4rem;
		text-transform: uppercase;
		margin: 0;
		padding: 5rem 0 16px 0;
	}
	h2:last-of-type {
		max-width: 600px;
		margin: auto;
	}
	:global(section h2 strong) {
		color: var(--color-pp-magenta);
		font-family: var(--font-heavy);
	}
	.chunk {
		display: flex;
	}

	@media (max-width: 600px) {
		h2 {
			font-size: 3rem;
		}
		section {
			padding: 0 2rem;
		}
	}
</style>
