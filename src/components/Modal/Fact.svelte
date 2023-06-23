<script>
	import thumbUp from "$svg/thumb-up.svg";
	import thumbDown from "$svg/thumb-down.svg";

	export let thumb;
	export let text;
	export let visible;
	export let i;
</script>

<div id={`fact-${i}`} class="fact" class:visible>
	<div class="thumb" class:good={thumb === "up"} class:bad={thumb === "down"}>
		{#if thumb === "up"}
			{@html thumbUp}
		{:else}
			{@html thumbDown}
		{/if}
	</div>
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
	.thumb {
		background: var(--color-pp-text-gray);
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		margin-right: 0.6rem;
		height: 25px;
		width: 25px;
		flex-shrink: 0;
	}
	.good {
		background: var(--color-pp-magenta);
		padding-bottom: 6px;
	}
	.bad {
		padding-top: 6px;
	}
	@media (max-width: 600px) {
		.fact {
			transform: translate(0, 0);
		}
	}
</style>
