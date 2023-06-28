<script>
	export let text;
	export let visible;
	export let i;
</script>

<div id={`fact-${i}`} class="fact" class:visible>
	{text}
</div>

<style>
	.fact {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
		padding: 1rem;
		border: 1px solid #e8e5e1;
		box-shadow: 0px 0px 5px rgba(124, 115, 115, 0.1);
		opacity: 0.2;
		transform: translate(0, -0.5rem);
		transition: all calc(var(--1s) * 0.5) ease-out;
	}
	.fact.visible {
		transform: translate(0, 0);
		opacity: 1;
	}
	@media (max-width: 600px) {
		.fact {
			transform: translate(0, 0);
		}
	}
</style>
