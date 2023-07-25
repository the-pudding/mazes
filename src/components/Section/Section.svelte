<script>
	import Prose from "$components/Section/Prose.svelte";
	import Slide from "$components/Section/Slide.svelte";
	import { language } from "$stores/misc.js";
	import _ from "lodash";
	import inView from "$actions/inView.js";

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
				<img
					src={`assets/img/${id}-bg.jpg`}
					class:visible
					alt={id === "a-right-removed"
						? "The Supreme Court building and signs that say things like Abortion is a Human Right"
						: "The Supreme Court building and women protesting, featuring a sign that says Bans Off Our Bodies"}
				/>

				{#each id === "a-right-removed" ? [1] : [1, 2, 3] as i}
					{@const alt =
						id === "the-people-push-back"
							? "A fist risen in the air"
							: "The 9 Supreme Court justices, emphasizing the conservative majority of 6 justices"}
					<img
						src={`assets/img/${id}-${i}.png`}
						class:visible
						class:overlay={true}
						{alt}
					/>
				{/each}
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
		line-height: 1;
	}
	#the-mazes {
		max-width: 800px;
	}
	#the-mazes h2 {
		max-width: 600px;
		margin: auto;
		padding: 5rem 0 0 0;
	}

	:global(section h2 strong) {
		color: var(--color-pp-magenta);
		font-family: var(--font-heavy);
		font-weight: 900;
	}
	.chunk {
		display: flex;
	}
	.img-wrapper {
		position: relative;
		width: 100%;
		max-width: 600px;
		margin: 1rem auto 0 auto;
	}
	img {
		width: 100%;
		opacity: 0;
		transition: all var(--1s) ease-in;
	}
	img.visible {
		opacity: 1;
	}
	.overlay {
		position: absolute;
		top: 0;
		transform: translateY(100px);
	}
	.overlay.visible {
		opacity: 1;
		transform: translateY(0);
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
