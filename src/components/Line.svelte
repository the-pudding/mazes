<script>
	import { onMount } from "svelte";

	const padding = 15;
	let start;
	let height;
	let width;
	let heights = [];

	onMount(() => {
		const div = document.querySelector("div.sections");
		height = div.clientHeight;
		width = div.clientWidth;
		const chunks = document.querySelectorAll("section > .chunk, section > h2");
		console.log({ chunks });
		start = chunks[0].offsetTop;
		heights = Array.from(chunks).map((chunk) => chunk.clientHeight);
	});

	$: pathStr = `M ${padding} ${start} ${heights.map(
		(h, i) =>
			`v ${h} h ${i % 2 === 0 ? width - padding * 2 : -(width - padding * 2)}`
	)}`;
</script>

{#if height}
	<svg width="100%" {height}>
		<path d={pathStr} />
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
	}
</style>
