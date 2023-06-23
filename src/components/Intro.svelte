<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";

	const { intro } = copy;
</script>

<section class="intro">
	{#each intro as text}
		<p>{@html text[$language]}</p>
	{/each}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		max-width: 700px;
		margin: auto;
		padding: 0 1rem;
		height: 100vh;
	}
	p {
		font-size: 2rem;
		text-align: center;
	}
</style>
