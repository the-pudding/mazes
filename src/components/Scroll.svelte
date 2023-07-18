<script>
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import Dashboard from "$components/Dashboard/Dashboard.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import scrollY from "$stores/scrollY.js";
	import mq from "$stores/mq.js";
	import _ from "lodash";
	import { language, scrollStep, direction } from "$stores/misc.js";

	const steps = copy.scroll;

	$: hed = steps[steps.length - 1][$language];
	$: $direction = $scrollY < 3000 ? "up" : "down";
	$: zoomDuration = $mq.reducedMotion ? 0 : 3000;
	$: zoom =
		$scrollStep === steps.length - 1 ||
		($scrollStep === undefined && $direction === "down");
</script>

<section id="scrolly">
	<div class="sticky" class:zoom style={`--dur: ${zoomDuration}ms`}>
		<div class="map" class:zoomed-out={zoom}>
			<Dashboard intro={true} {zoom} />
		</div>
		<h1
			class:visible={zoom}
			style={`--delay: ${zoomDuration}ms; --dur: ${zoomDuration / 3}ms`}
		>
			<span>This is the...</span>
			{hed}
		</h1>

		<!-- <button
			class="link"
			class:visible={zoom}
			style={`--delay: ${zoomDuration ? zoomDuration - 500 : 0}ms`}
			on:click={() => (location.href = "#dashboard")}
		>
			See all mazes
			<Icon name="arrow-right" />
		</button> -->
	</div>

	<div class="steps">
		<Scrolly bind:value={$scrollStep}>
			{#each steps as text}
				<div class="step">
					<p>{@html text[$language]}</p>
				</div>
			{/each}
		</Scrolly>
		<div class="spacer" />
	</div>
</section>

<style>
	.sticky {
		position: sticky;
		top: 0;
		width: 90%;
		height: 100vh;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		transition: all var(--dur);
	}
	.sticky.zoom {
		z-index: 1;
	}
	.steps {
		position: relative;
	}
	.step {
		background: white;
		border: 1px solid var(--color-pp-gray-1);
		box-shadow: 0px 0px 5px rgba(124, 115, 115, 0.1);
		text-align: center;
		max-width: 580px;
		margin: 70vh auto;
	}
	.step:first-of-type {
		margin-top: 10vh;
	}
	.step:last-of-type {
		visibility: hidden;
		margin-bottom: 10vh;
	}
	.step p {
		font-size: 1.2rem;
		line-height: 1.75;
		padding: 1.2rem;
	}
	.spacer {
		height: 75vh;
	}
	.map {
		position: absolute;
		max-width: min(100%, 900px);
		max-height: calc(100vh - 3rem);
		top: 3rem;
		transform: translate(35%, -50%) scale(8);
		transition: all var(--dur);
	}
	.map.zoomed-out {
		transform: translate(0, 0) scale(1);
	}
	h1 {
		font-family: var(--font-heavy);
		font-weight: 900;
		font-size: 4rem;
		position: absolute;
		top: 4rem;
		text-align: center;
		background: rgb(249, 247, 244, 0.9);
		color: var(--color-pp-magenta);
		text-transform: uppercase;
		z-index: 1;
		opacity: 0;
		transition: none;
	}
	h1.visible {
		transition: opacity var(--dur) var(--delay);
		opacity: 1;
	}
	h1 span {
		font-family: var(--sans);
		font-size: 1.8rem;
		display: block;
		color: var(--color-pp-dark);
		text-transform: none;
		margin: 0.5rem 0 1rem;
	}
	.link {
		position: absolute;
		bottom: 2rem;
		right: 0;
		opacity: 0;
		color: var(--color-pp-text-gray);
		background: none;
		display: flex;
		align-items: center;
	}
	.link.visible {
		transition: opacity calc(var(--1s) * 0.5) var(--delay);
		opacity: 1;
	}
	.link:hover {
		color: var(--color-pp-text-gray-1);
		transform: translateX(0.125rem);
		transition: all 0.2s ease-in;
	}

	@media (max-width: 800px) {
		h1 {
			font-size: 3rem;
		}
		h1 span {
			font-size: 1.5rem;
		}
		.map.zoomed-out {
			transform: translate(0, 25%);
		}
	}
	@media (max-width: 600px) {
		h1 {
			font-size: 3.5rem;
			line-height: 3.5rem;
		}
		.step {
			margin: 70vh 1rem;
		}
		.map.zoomed-out {
			transform: translate(0, 50%);
		}
	}
	@media (max-width: 350px) {
		h1 {
			font-size: 2.8rem;
			line-height: 2.8rem;
		}
		h1 span {
			font-size: 1rem;
		}
	}
</style>
