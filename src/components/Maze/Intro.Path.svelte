<script>
	import { scrollStep } from "$stores/misc";
	import { previous } from "$stores/previous.js";
	import mq from "$stores/mq.js";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";
	import viewport from "$stores/viewport.js";

	export let i;
	export let d;
	export let visible;

	let pathEl;
	let pathLength = 0;
	const strokeDashOffset = tweened(0, {
		duration: $mq.reducedMotion ? 0 : 2000,
		easing: cubicOut
	});
	const prevScrollStep = previous(scrollStep);

	$: if (visible && moving) strokeDashOffset.set(0);
	$: if (!visible && moving) strokeDashOffset.set(pathLength);
	$: if (visible && !moving) strokeDashOffset.set(0, { duration: 0 });
	$: if (!visible && !moving) strokeDashOffset.set(pathLength, { duration: 0 });

	$: $viewport.width, (pathLength = !pathEl ? 0 : pathEl.getTotalLength() + 1);
	$: forwards =
		$scrollStep > $prevScrollStep || (!$prevScrollStep && $scrollStep === 0);
	$: moving = forwards
		? visible && $scrollStep === i + 1
		: !visible && $scrollStep === i;
</script>

<path
	bind:this={pathEl}
	{d}
	style={`stroke-dasharray: ${pathLength}; stroke-dashoffset: ${$strokeDashOffset}`}
/>

<style>
	path {
		fill: none;
		stroke: var(--color-pp-magenta);
		stroke-width: 1px;
		stroke-linecap: square;
	}
</style>
