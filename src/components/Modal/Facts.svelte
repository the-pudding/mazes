<script>
	import _ from "lodash";
	import { scaleLinear } from "d3-scale";
	import {
		globalGameState,
		pathLength,
		currentMazeSize
	} from "$stores/misc.js";

	export let facts;

	let containerHeight;
	let factEls = [];
	let currentFact = 0;

	const onClick = (i) => {
		currentFact = i;
	};
	const getZIndex = (i, currentFact) => {
		const distance = Math.abs(i - currentFact);
		return facts.length - distance;
	};
	const cycleFact = () => {
		if (currentFact < facts.length - 1) {
			currentFact++;
		}
	};

	$: if ($globalGameState === "mid" && $pathLength % steps === steps - 1)
		cycleFact();
	$: if ($globalGameState === "pre" || $pathLength === 0) currentFact = 0;
	$: steps = $currentMazeSize <= 10 ? 2 : 5;
	$: heights = factEls.map((d) => d.getBoundingClientRect().height);
	$: combinedFactHeight = _.sum(heights);
	$: topScale = scaleLinear()
		.domain([0, combinedFactHeight - heights[heights.length - 1]])
		.range([0, containerHeight - heights[heights.length - 1]]);
</script>

<div class="facts" bind:clientHeight={containerHeight}>
	{#each facts as { fact }, i}
		{@const top = i === 0 ? 0 : topScale(_.sum(_.slice(heights, 0, i)))}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			bind:this={factEls[i]}
			on:click={() => onClick(i)}
			class="fact"
			class:fade={$globalGameState === "pre" || i !== currentFact}
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
		border-radius: 5px;
		padding: 1rem;
	}
	.fact:hover {
		cursor: pointer;
		color: rgba(28, 18, 70, 0.7);
	}
	.fade {
		color: rgba(28, 18, 70, 0.1);
		border: 1px solid rgba(176, 163, 128, 0.3);
	}
</style>
