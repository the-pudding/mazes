<script>
	import Icon from "$components/helpers/Icon.svelte";
	import { getContext } from "svelte";
	import viewport from "$stores/viewport.js";

	const { getGameState } = getContext("maze");
	const gameState = getGameState();

	$: mobile = $viewport.width < 600;
</script>

{#if mobile}
	<div class="mobile">
		{#each ["up", "right", "down", "left"] as direction}
			<button class={direction} disabled={$gameState !== "mid"}
				><Icon name={`arrow-${direction}`} /></button
			>
			{#if direction === "up"}
				<div class="text">Tap arrow buttons to navigate</div>
			{/if}
		{/each}
	</div>
{:else}
	<div class="desktop" class:background={$gameState === "pre"}>
		<div class="keys">
			{#each ["up", "left", "down", "right"] as direction}
				<span class={`key ${direction}`}>
					<Icon name={`arrow-${direction}`} />
				</span>
			{/each}
		</div>
		<div class="text">Use arrow keys to navigate</div>
	</div>
{/if}

<style>
	.desktop {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.background {
		background: white;
		padding: 0.5rem;
	}
	.text {
		color: var(--color-pp-gray-1);
	}
	.desktop .text {
		font-size: 0.9rem;
		margin-top: 4px;
		text-align: center;
		max-width: 100px;
	}
	.mobile .text {
		font-size: 0.7rem;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(1.6rem, -100%);
		text-align: start;
	}
	.keys {
		display: grid;
		grid-template-rows: 22px 22px;
		grid-template-columns: 22px 22px 22px;
		gap: 4px;
	}
	.key {
		background: var(--color-pp-gray-1);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 4px;
		border-radius: 4px;
		font-size: 0.7rem;
	}
	span.up {
		grid-row: 1;
		grid-column: 2;
	}
	span.left {
		grid-row: 2;
		grid-column: 1;
	}
	span.down {
		grid-row: 2;
		grid-column: 2;
	}
	span.right {
		grid-row: 2;
		grid-column: 3;
	}
	button {
		position: absolute;
		background: var(--color-pp-gray-1);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
	}
	button.up {
		top: 0;
		left: 50%;
		transform: translate(-50%, -110%);
		display: flex;
		align-items: center;
	}
	button.down {
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 110%);
	}
	button.left {
		top: 50%;
		left: 0;
		transform: translate(-110%, -50%);
	}
	button.right {
		top: 50%;
		right: 0;
		transform: translate(110%, -50%);
	}
</style>
