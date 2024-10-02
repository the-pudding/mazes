<script>
	export let title;
	export let content;
</script>

<div class="inner">
	<h4>{title}</h4>
	{#each content as { type, value }}
		<p>{@html value}</p>
	{/each}
</div>

<style>
	:global(#methodology) {
		display: flex;
		background: var(--color-tan);
		height: 100vh;
	}
	.inner {
		max-width: 800px;
		margin: auto;
		border-top: 1px solid var(--color-dark-tan);
		padding: 2rem 0;
	}
	h4 {
		font-family: var(--serif);
	}
	p {
		color: var(--color-dark-tan);
	}

	@media (max-width: 600px) {
		:global(#methodology) {
			height: auto;
		}
	}
</style>
