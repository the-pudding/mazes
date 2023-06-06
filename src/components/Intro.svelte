<script>
	import copy from "$data/copy.json";

	const { intro } = copy;

	const lines = intro.map((d) => d.value);
	const groups = [lines.slice(0, 1), lines.slice(1, 4), lines.slice(4)];
</script>

<section class="intro">
	{#each groups as group, i}
		<div class="group">
			{#each group as line, j}
				{@const emphasis = i === groups.length - 1 && j === group.length - 1}
				<p class:emphasis>{@html line}</p>
			{/each}
		</div>
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
	.emphasis {
		color: var(--color-pp-magenta);
		text-transform: uppercase;
		font-size: 4rem;
	}
</style>
