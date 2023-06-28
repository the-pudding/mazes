<script>
	import { scrollStep } from "$stores/misc";
	import { previous } from "$stores/previous.js";

	export let i;
	export let d;
	export let visible;

	const prevScrollStep = previous(scrollStep);
	let pathEl;

	$: pathLength = pathEl?.getTotalLength();
	$: forwards = $scrollStep > $prevScrollStep;
	$: moving = forwards
		? visible && $scrollStep === i + 1
		: !visible && $scrollStep === i;
</script>

<path
	bind:this={pathEl}
	{d}
	class:moving
	class:visible
	style={`--length: ${pathLength}`}
/>

<style>
	path {
		fill: none;
		stroke: var(--color-pp-magenta);
		stroke-width: 5px;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-dasharray: var(--length);
		stroke-dashoffset: var(--length);
	}
	.visible {
		stroke-dashoffset: 0;
	}
	.moving {
		transition: stroke-dashoffset calc(var(--1s) * 2) ease-in-out;
	}
</style>
