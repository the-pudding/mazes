<script>
	export let text;
	export let onClick;
	export let disabled = false;
	export let style;
</script>

<button on:click={onClick} {style} {disabled}>
	{text.toUpperCase()}
</button>

<style>
	button {
		background: var(--color-pp-magenta);
		color: white;
		font-family: var(--font-bold);
		padding: 0.5rem 1rem;
		border-radius: 100px;
	}
	button:hover {
		background: #c5167f;
	}

	@media (max-width: 600px) {
		button {
			font-size: 0.8rem;
		}
	}
</style>
