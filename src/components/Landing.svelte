<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
	import loadImage from "$utils/loadImage.js";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { fly } from "svelte/transition";

	const { intro } = copy;

	let img;

	onMount(async () => {
		img = await loadImage("assets/img/hero-bg.jpg");
	});
</script>

<section class="intro">
	<div class="img-wrapper">
		{#if img}
			<img src="assets/img/hero-bg.jpg" transition:fade class="visible" />
		{/if}

		<img src="assets/img/hero-2.png" class:visible={img} />
		<img src="assets/img/hero-3.png" class:visible={img} />
		<img src="assets/img/hero-4.png" class:visible={img} />
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
		max-width: 1000px;
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
		height: 40vh;
	}

	.img-wrapper img {
		position: absolute;
		max-height: 100%;
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
	}
</style>
