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
		color: white;
		font-family: var(--font-bold);
		padding: 1rem 2rem;
		border-radius: 100px;
		font-size: 0.8rem;
	}

	@media (max-width: 600px) {
		button {
			font-size: 0.8rem;
		}
	}
</style>
