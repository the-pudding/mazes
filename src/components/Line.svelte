<script>
	import { onMount, tick } from "svelte";
	import scrollY from "$stores/scrollY.js";
	import _ from "lodash";
	import { scaleLinear } from "d3";
	import viewport from "$stores/viewport.js";
	import { browser } from "$app/environment";
	import { mazeData } from "$stores/misc.js";

	const inlineStates = ["wi", "ks", "mt", "fl", "la", "il", "il-simple"];
	let offset = 0;
	let height = 0;
	let width = 0;
	let heights = [];
	let startY = 0;
	let pathLength = 0;

	$: padding = $viewport.width < 1200 ? 15 : 15 + ($viewport.width - 1200) / 2;
	$: dashScale = scaleLinear()
		.domain([offset, offset + _.sum(heights) - $viewport.height + 1000])
		.range([pathLength, 0])
		.clamp(true);
	$: currentDashOffset = dashScale($scrollY);
	$: pathStr = `M ${padding} ${startY} ${heights
		.map(
			(h, i) =>
				`v ${h} ${
					i === heights.length - 1
						? ""
						: `h ${i % 2 === 0 ? width - padding * 2 : -(width - padding * 2)}`
				}`
		)
		.join(" ")}`;
	$: pathLength = _.sum(heights) + (width - padding * 2) * heights.length;
	$: $viewport.width, $viewport.height, loaded.length, measure();
	$: loaded = Object.keys($mazeData).filter((d) => inlineStates.includes(d));

	const measure = async () => {
		if (browser) {
			await tick();

			const container = document.querySelector("div.sections");
			height = container.clientHeight;
			width = container.clientWidth;
			offset = container.offsetTop;

			const chunks = Array.from(
				document.querySelectorAll("section > .chunk, section > .head")
			);
			startY = chunks[0].offsetTop;
			const chunksGrouped = chunks.reduce((acc, current, i) => {
				if (current.className.includes("head"))
					return [...acc, [current, chunks[i + 1]]];
				else if (chunks[i - 1] && chunks[i - 1].className.includes("head"))
					return acc;
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
		opacity: 0.3;
		fill: none;
		stroke-dasharray: var(--pathLength);
		stroke-dashoffset: var(--offset);
	}
</style>
