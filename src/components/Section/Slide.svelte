<script>
	import inView from "$actions/inView.js";
	import mq from "$stores/mq.js";

	export let before;
	export let after;
	export let panels;

	let visible = false;
</script>

<div
	class="container"
	use:inView
	on:enter={() => (visible = true)}
	on:exit={() => (visible = false)}
>
	{#if before}<div class="before">{@html before}</div>{/if}

	{#each panels as { value }, i}
		{@const delay = $mq.reducedMotion ? 0 : i * 500}
		<div class="panel" class:visible style={`--delay: ${delay}ms`}>
			{@html value}
		</div>
	{/each}

	{#if after}<div class="after">{@html after}</div>{/if}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 2rem;
	}
	.panel {
		padding: 2rem;
		margin: 1rem 0;
		background: var(--color-pp-gray-1);
		text-align: center;
		visibility: hidden;
		transition: all calc(var(--1s) * 2.5) var(--delay);
	}
	.panel:nth-child(odd) {
		transform: translate(100vw, 0);
	}
	.panel:nth-child(even) {
		transform: translate(-100vw, 0);
	}
	.panel.visible {
		visibility: visible;
		transform: translate(0, 0);
	}
	:global(.panel strong) {
		color: var(--color-pp-magenta);
		font-weight: 900;
		text-transform: uppercase;
	}
	.before {
		margin-bottom: 2rem;
	}
	.after {
		margin-top: 2rem;
	}
</style>
