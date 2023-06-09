<script>
	import Prose from "$components/Section/Prose.svelte";
	import Slide from "$components/Section/Slide.svelte";
	import _ from "lodash";

	export let title;
	export let chunks;

	$: id = _.kebabCase(title).replaceAll("-strong", "");

	const components = { Prose, Slide };
</script>

<section {id}>
	<h2>{@html title}</h2>

	{#each chunks as { type, component, maze, align, text, before, after, panels }}
		<svelte:element this={type}>
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
		padding: 10rem 4rem;
	}
	h2 {
		font-size: 4rem;
		text-transform: uppercase;
	}
	:global(section h2 strong) {
		color: var(--color-pp-magenta);
		font-weight: 900;
	}
</style>
