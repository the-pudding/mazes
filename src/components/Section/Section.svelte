<script>
	import Prose from "$components/Section/Prose.svelte";
	import Slide from "$components/Section/Slide.svelte";
	import _ from "lodash";

	export let title;
	export let chunks;

	$: id = _.kebabCase(title);

	const components = { Prose, Slide };

	const titleWords = title.split(" ");
	const titlePart1 = titleWords.slice(0, titleWords.length - 2).join(" ");
	const titlePart2 = titleWords.slice(titleWords.length - 2).join(" ");
</script>

<section {id}>
	<h2>{titlePart1}<br /><span>{titlePart2}</span></h2>

	{#each chunks as { type, component, maze, text, before, after, panels }}
		<svelte:element this={type}>
			<svelte:component
				this={components[component]}
				{maze}
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
		max-width: 90%;
		margin: 10rem auto;
	}
	h2 {
		font-size: 4rem;
		text-transform: uppercase;
	}
	h2 span {
		color: var(--color-pp-magenta);
		font-weight: 900;
	}
</style>
