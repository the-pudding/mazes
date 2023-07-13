<script>
	import Prose from "$components/Section/Prose.svelte";
	import Slide from "$components/Section/Slide.svelte";
	import { language } from "$stores/misc.js";
	import _ from "lodash";
	import inView from "$actions/inView.js";
	import { fade } from "svelte/transition";
	import { fly } from "svelte/transition";

	export let title;
	export let chunks;

	let visible = false;

	$: id = _.kebabCase(title.english).replaceAll("-strong", "");

	const components = { Prose, Slide };

	function toggleVisible(view) {
		visible = view == "enter" ? true : false;
	}
</script>

<section {id}>
	<div
		class="head"
		use:inView
		on:enter={() => toggleVisible("enter")}
		on:exit={() => toggleVisible("exit")}
	>
		{#if id !== "the-mazes"}
			<div class="img-wrapper">
				{#if id == "a-right-removed" && visible}
					<img src="assets/img/{id}-bg.jpg" transition:fade />
					<img
						src="assets/img/{id}-sc.png"
						transition:fly={{ y: 100, duration: 500, delay: 500 }}
					/>
				{:else if id == "the-peoples-power" && visible}
					<img src="assets/img/{id}-bg.jpg" transition:fade />
					<img
						src="assets/img/{id}-1.png"
						transition:fly={{ y: 100, duration: 500, delay: 500 }}
					/>
					<img
						src="assets/img/{id}-2.png"
						transition:fly={{ y: 100, duration: 500, delay: 750 }}
					/>
					<img
						src="assets/img/{id}-3.png"
						transition:fly={{ y: 100, duration: 500, delay: 1000 }}
					/>
				{/if}
			</div>
		{/if}
		<h2>{@html title[$language]}</h2>
	</div>

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
		padding: 1rem 0 0 0;
		text-align: center;
	}
	#the-mazes h2 {
		max-width: 600px;
		margin: auto;
		padding: 5rem 0 0 0;
	}

	:global(section h2 strong) {
		color: var(--color-pp-magenta);
		font-family: var(--font-heavy);
	}
	.chunk {
		display: flex;
	}
	.img-wrapper {
		position: relative;
		width: 100%;
		max-width: 700px;
		height: 500px;
		margin: 0 auto;
	}
	img {
		position: absolute;
		max-width: 700px;
		margin: auto;
		padding: 4rem 0 0 0;
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
