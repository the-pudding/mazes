<script>
	import inView from "$actions/inView.js";
	import mq from "$stores/mq.js";
	import { language } from "$stores/misc.js";

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
	{#if before}<div class="before">{@html before[$language]}</div>{/if}

	{#each panels as text, i}
		{@const delay = $mq.reducedMotion ? 0 : i * 500}
		<div class="panel" class:visible style={`--delay: ${delay}ms`}>
			<div class="panel-underlay"><p>{@html text[$language]}</p></div>
			<div class="panel-text"><p>{@html text[$language]}</p></div>
		</div>
	{/each}

	{#if after}<div class="after">{@html after[$language]}</div>{/if}
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 2rem;
		overflow: hidden;
		margin: 5rem 0;
	}
	.panel {
		margin: 1rem 0;
		text-align: center;
		visibility: hidden;
		transition: all calc(var(--1s) * 2.5) var(--delay);
		position: relative;
		height: auto;
		min-height: 10rem;
		width: 100%;
	}
	.panel-text,
	.panel-underlay {
		position: absolute;
		top: 50%;
		left: 50%;
		padding: 1rem 2rem;
		transform: translate(-50%, -50%);
	}
	.panel-text {
		background: url("/assets/img/paper-texture.jpg");
		background-position: 100% 100%;
		/* background: var(--color-pp-gray-1); */
	}
	.panel-underlay {
		background: url("/assets/img/line-texture.png");
		background-position: 100% 100%;
		background-size: 600px;
		transform: translate(-50%, -50%) translate(0.5rem, 0.5rem);
	}
	.panel:nth-child(odd) .panel-underlay {
		background: var(--color-pp-dark-purple);
	}
	:global(
			#a-right-removed .panel:nth-of-type(2) .panel-text,
			.panel:nth-of-type(2) .panel-underlay
		) {
		clip-path: polygon(5% 5%, 100% 0%, 100% 90%, 0% 100%);
	}
	:global(
			#a-right-removed .panel:nth-of-type(3) .panel-text,
			.panel:nth-of-type(3) .panel-underlay
		) {
		clip-path: polygon(0% 5%, 100% 10%, 100% 100%, 0% 95%);
	}
	:global(
			#a-right-removed .panel:nth-of-type(4) .panel-text,
			.panel:nth-of-type(4) .panel-underlay
		) {
		min-width: 35rem;
		clip-path: polygon(5% 5%, 100% 10%, 100% 95%, 0% 100%);
	}
	:global(#the-peoples-power .panel) {
		min-height: 14rem;
	}
	:global(
			#the-peoples-power .panel:nth-of-type(2) .panel-text,
			#the-peoples-power .panel:nth-of-type(2) .panel-underlay
		) {
		min-width: 90%;
		clip-path: polygon(0% 5%, 100% 0%, 100% 90%, 2% 100%);
	}
	:global(
			#the-peoples-power .panel:nth-of-type(3) .panel-text,
			#the-peoples-power .panel:nth-of-type(3) .panel-underlay
		) {
		min-width: 90%;
		clip-path: polygon(0% 5%, 100% 10%, 100% 100%, 0% 95%);
	}
	.panel-underlay p {
		visibility: hidden;
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
		font-family: var(--font-heavy);
		font-weight: 900;
		text-transform: uppercase;
	}
	:global(.panel a) {
		font-family: var(--font-heavy);
		font-weight: 900;
		color: var(--color-pp-dark);
	}
	.before {
		margin-bottom: 2rem;
	}
	.after {
		margin-top: 2rem;
	}

	@media (max-width: 600px) {
		.container {
			font-size: 1.6rem;
		}
	}
</style>
