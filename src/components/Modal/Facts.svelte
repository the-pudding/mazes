<script>
	import _ from "lodash";
	import { scaleLinear } from "d3-scale";
	import {
		globalGameState,
		pathLength,
		currentMazeSize
	} from "$stores/misc.js";
	import viewport from "$stores/viewport.js";

	export let facts;

	let containerHeight;
	let factEls = [];
	let currentFact = 0;

	const getZIndex = (i, currentFact) => {
		const distance = Math.abs(i - currentFact);
		return facts.length - distance;
	};
	const cycleFact = () => {
		if (currentFact < facts.length - 1) {
			currentFact = currentFact + 1;
		}
	};

	function onFactMouse(event, currZIndex, visible) {
		if (visible) {
			event.target.style.zIndex = 100;
		}
	}

	function onFactLeave(event, currZIndex, visible) {
		if (visible) {
			event.target.style.zIndex = currZIndex;
		}
	}

	$: if ($globalGameState === "pre" || $pathLength === 0) currentFact = 0;
	$: if ($globalGameState === "mid" && $pathLength % steps === steps - 1)
		cycleFact();
	$: if ($globalGameState === "post") currentFact = facts.length - 1;
	$: mobile = $viewport.width < 700;
	$: steps = $currentMazeSize <= 10 ? 2 : 5;
	$: heights = factEls.map((d) => d.getBoundingClientRect().height);
	$: maxFactHeight = _.max(heights);
	$: combinedFactHeight = _.sum(heights);
	$: topScale = scaleLinear()
		.domain([0, combinedFactHeight - heights[heights.length - 1]])
		.range([0, containerHeight - heights[heights.length - 1]]);
</script>

<div
	class="facts"
	style:height={mobile ? `${maxFactHeight}px` : null}
	bind:clientHeight={containerHeight}
>
	{#each facts as { fact }, i}
		{@const plentyOfRoom = containerHeight > combinedFactHeight}
		{@const heightAbove = _.sum(
			_.slice(
				factEls.map((d) => d.clientHeight),
				0,
				i
			)
		)}
		{@const top =
			i === 0
				? 0
				: plentyOfRoom
				? heightAbove - 20
				: topScale(_.sum(_.slice(heights, 0, i)))}
		<div
			bind:this={factEls[i]}
			on:mouseover={(e) =>
				onFactMouse(e, getZIndex(i, currentFact), currentFact >= i)}
			on:mouseleave={(e) =>
				onFactLeave(e, getZIndex(i, currentFact), currentFact >= i)}
			class="fact"
			class:above={i < currentFact}
			class:below={i > currentFact}
			class:disabled={$globalGameState === "pre"}
			class:fade={$globalGameState === "pre" || currentFact !== i}
			class:visible={currentFact >= i}
			style:top={`${top}px`}
			style:z-index={getZIndex(i, currentFact)}
		>
			{@html fact}
		</div>
	{/each}
</div>

<style>
	.facts {
		position: relative;
		height: 100%;
		width: 100%;
	}
	.fact {
		position: absolute;
		width: 100%;
		background: var(--color-bg);
		border: 1px solid var(--color-dark-tan);
		border-radius: 3px;
		padding: 1rem;
		opacity: 0;
		cursor: pointer;
		transform: translateY(20px);
		transition: transform calc(var(--1s) * 0.3), color calc(var(--1s) * 0.3),
			border calc(var(--1s) * 0.3), opacity calc(var(--1s) * 0.3),
			z-index calc(var(--1s) * 0.3);
	}
	.visible {
		opacity: 1;
		transform: translateY(0);
	}
	.fact:hover {
		color: var(--color-fg);
		border: 1px solid var(--color-dark-tan);
	}
	.fade {
		color: rgba(28, 18, 70, 0.1);
		border: 1px solid rgba(176, 163, 128, 0.3);
	}
	.fade.above:hover {
		transform: translateY(-5px);
	}
	.fade.below:hover {
		transform: translateY(5px);
	}
	.fact.disabled {
		pointer-events: none;
	}

	@media (max-width: 700px) {
		.facts {
			/* min-height: 200px; */
			/* padding-bottom: 2rem; */
		}
		.fact {
			padding: 0.5rem;
			font-size: 0.9rem;
		}
	}
</style>
