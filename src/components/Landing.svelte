<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
	import loadImage from "$utils/loadImage.js";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import viewport from "$stores/viewport.js";

	const { intro } = copy;

	let img;

	$: mobile = $viewport.width < 600;

	onMount(async () => {
		img = await loadImage("assets/img/hero-bg.jpg");
	});
</script>

<section class="intro">
	<div class="img-wrapper">
		{#if img}
			<img
				src={`assets/img/hero-bg${mobile ? "-small" : ""}.jpg`}
				alt="The Supreme Court building on a pink and purple background"
				transition:fade
			/>
		{/if}

		{#each [2, 3, 4] as i}
			{@const alt =
				i === 2 || i === 2
					? "A woman protesting, with her fist raised in the air"
					: "A woman wearing a mask carrying a sign that says Abortion Saved My Life"}
			<img
				src={`assets/img/hero-${i}${mobile ? "-small" : ""}.png`}
				class:visible={img}
				class:overlay={true}
				{alt}
			/>
		{/each}
	</div>
	{#each intro as text}
		<p>{@html text[$language]}</p>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 800px;
		margin: auto;
		padding: 0 2rem;
		height: 100vh;
	}
	p {
		font-size: 2rem;
		text-align: center;
		margin: 2rem 0 0 0;
		max-width: 750px;
	}

	.img-wrapper {
		position: relative;
		width: 100%;
	}

	.img-wrapper img {
		width: 100%;
	}
	img.overlay {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -20%);
		opacity: 0;
		transition: all var(--1s);
	}
	img.visible {
		transform: translate(-50%, -50%);
		opacity: 1;
	}

	@media (max-width: 600px) {
		p {
			font-size: 1.5rem;
		}
		.img-wrapper {
			width: 100vw;
		}
	}
</style>
