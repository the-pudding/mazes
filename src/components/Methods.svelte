<script>
	import copy from "$data/copy.json";
</script>

<section class="methods">
	<h3>Methodology</h3>

	{#each copy.methodology as { value }}
		<p>{@html value}</p>
	{/each}
</section>

<style>
	section {
		max-width: 700px;
		margin: auto;
		padding: 10rem 2rem;
	}
	h3 {
		font-size: 1.2rem;
		text-transform: uppercase;
		font-weight: 900;
	}
	p {
		color: var(--color-pp-text-gray);
	}
</style>
