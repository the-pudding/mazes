<script>
	export let text;
	export let onClick;
	export let margin = {};

	$: marginStr = `${margin.top || 0} ${margin.right || 0} ${margin.left || 0} ${
		margin.bottom || 0
	}`;
</script>

<button on:click={onClick} style={`margin: ${marginStr}`}>
	{text.toUpperCase()}
</button>

<style>
	button {
		background: var(--color-pp-magenta);
		color: white;
		padding: 0.5rem 1rem;
		font-weight: 500;
		border-radius: 100px;
	}
	button:hover {
		background: #c5167f;
	}
</style>
