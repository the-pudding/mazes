<script>
	import { scrollStep } from "$stores/misc";
	import { previous } from "$stores/previous.js";
	import mq from "$stores/mq.js";
	import { tweened } from "svelte/motion";
	import { cubicOut } from "svelte/easing";

	export let i;
	export let d;
	export let visible;

	let pathEl;
	const strokeDashOffset = tweened(0, {
		duration: $mq.reducedMotion ? 0 : 2000,
		easing: cubicOut
	});
	const prevScrollStep = previous(scrollStep);

	$: if (visible && moving) strokeDashOffset.set(0);
	$: if (!visible && moving) strokeDashOffset.set(pathLength);
	$: if (visible && !moving) strokeDashOffset.set(0, { duration: 0 });
	$: if (!visible && !moving) strokeDashOffset.set(pathLength, { duration: 0 });

	$: pathLength = pathEl?.getTotalLength() + 1; // gets rid of dot on mobile
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
		stroke-width: 5px;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
</style>
