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
		img = await loadImage("assets/img/hero.png");
	});
</script>

<section class="intro">
	<!-- {#if img}
		<img src="assets/img/hero.png" transition:fade />
	{/if} -->
	<div class="img-wrapper">
		{#if img}
		<img src="assets/img/hero-bg.jpg" transition:fade />
		<img src="assets/img/hero-2.png" transition:fly={{ y: 100, duration: 500, delay: 500 }} />
		<img src="assets/img/hero-3.png" transition:fly={{ y: 100, duration: 500, delay: 750 }} />
		<img src="assets/img/hero-4.png" transition:fly={{ y: 100, duration: 500, delay: 1000 }} />
		{/if}
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
	}

	@media (max-width: 600px) {
		p {
			font-size: 1.5rem;
		}
	}
</style>
