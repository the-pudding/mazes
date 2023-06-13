<script>
	import thumbUp from "$svg/thumb-up.svg";
	import thumbDown from "$svg/thumb-down.svg";
	import { slide, fade } from "svelte/transition";

	export let thumb;
	export let text;
	export let visible;
</script>

<div class="fade" transition:fade>
	<div class="fact" class:visible in:slide>
		<div class="thumb" class:good={thumb === "up"} class:bad={thumb === "down"}>
			{#if thumb === "up"}
				{@html thumbUp}
			{:else}
				{@html thumbDown}
			{/if}
		</div>
		{text}
	</div>
</div>

<style>
	.fact {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
		padding: 1rem;
		border: 1px solid #e8e5e1;
		box-shadow: 0px 0px 5px rgba(124, 115, 115, 0.1);
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
</style>
