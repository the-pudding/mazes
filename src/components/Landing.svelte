<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
	import loadImage from "$utils/loadImage.js";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	const { intro } = copy;

	let img;

	onMount(async () => {
		img = await loadImage("assets/img/hero.png");
	});
</script>

<section class="intro">
	{#if img}
		<img src="assets/img/hero.png" transition:fade />
	{/if}
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
		max-width: 750px;
		margin: auto;
		padding: 0 1rem;
		height: 100vh;
	}
	p {
		font-size: 2rem;
		text-align: center;
		margin: 2rem 0 0 0;
	}

	@media (max-width: 600px) {
		p {
			font-size: 1.5rem;
		}
	}
</style>
