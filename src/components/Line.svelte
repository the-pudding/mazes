<script>
	import { onMount } from "svelte";
	import scrollY from "$stores/scrollY.js";
	import _ from "lodash";
	import { scaleLinear } from "d3";

	const padding = 15;
	let start;
	let height;
	let width;
	let heights = [];
	let pathLength;
	$: dashScale = scaleLinear().domain([0, 4500]).range([pathLength, 0]); // TODO should be max scrollY
	$: currentDashOffset = dashScale($scrollY);

	onMount(() => {
		const div = document.querySelector("div.sections");
		height = div.clientHeight;
		width = div.clientWidth;
		const chunks = document.querySelectorAll("section > .chunk, section > h2");
		start = chunks[0].offsetTop;
		heights = Array.from(chunks).map((chunk) => chunk.clientHeight);
		pathLength = _.sum(heights) + (width - padding * 2) * heights.length;
	});

	$: pathStr = `M ${padding} ${start} ${heights.map(
		(h, i) =>
			`v ${h} h ${i % 2 === 0 ? width - padding * 2 : -(width - padding * 2)}`
	)}`;
</script>

{#if height}
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
