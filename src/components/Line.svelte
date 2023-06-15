<script>
	import { onMount } from "svelte";
	import scrollY from "$stores/scrollY.js";
	import _ from "lodash";
	import { scaleLinear } from "d3";
	import viewport from "$stores/viewport.js";
	import { browser } from "$app/environment";

	const padding = 15;
	let offset = 0;
	let height = 0;
	let width = 0;
	let heights = [];
	let startY = 0;
	let pathLength = 0;
	$: dashScale = scaleLinear()
		.domain([offset, offset + height])
		.range([pathLength, 0]);
	$: currentDashOffset = dashScale($scrollY >= offset ? $scrollY : pathLength);
	$: pathStr = `M ${padding} ${startY} ${heights.map(
		(h, i) =>
			`v ${h} h ${i % 2 === 0 ? width - padding * 2 : -(width - padding * 2)}`
	)}`;
	$: pathLength = _.sum(heights) + (width - padding * 2) * heights.length;
	$: $viewport.width, $viewport.height, measure();

	const measure = () => {
		if (browser) {
			const container = document.querySelector("div.sections");
			height = container.clientHeight;
			width = container.clientWidth;
			offset = container.offsetTop;

			const chunks = Array.from(
				document.querySelectorAll("section > .chunk, section > h2")
			);
			startY = chunks[0].offsetTop;
			const chunksGrouped = chunks.reduce((acc, current, i) => {
				if (current.tagName === "H2") return [...acc, [current, chunks[i + 1]]];
				else if (chunks[i - 1] && chunks[i - 1].tagName === "H2") return acc;
				else return [...acc, current];
			}, []);
			heights = chunksGrouped.map((chunk) => {
				if (Array.isArray(chunk)) {
					const [h2, div] = chunk;
					return h2.clientHeight + div.clientHeight;
				} else return chunk.clientHeight;
			});
		}
	};

	onMount(() => {
		measure();
	});
</script>

{#if height && pathStr}
	<svg width="100%" {height}>
		<path
			d={pathStr}
			style={`--pathLength: ${pathLength}px; --offset: ${currentDashOffset}`}
		/>
	</svg>
{/if}

<style>
	svg {
		position: absolute;
		top: 0;
		pointer-events: none;
	}
	path {
		stroke: var(--color-pp-light-purple);
		stroke-width: 3px;
		opacity: 0.5;
		fill: none;
		stroke-dasharray: var(--pathLength);
		stroke-dashoffset: var(--offset);
	}
</style>
