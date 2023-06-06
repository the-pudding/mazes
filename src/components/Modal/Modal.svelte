<script>
	import Maze from "$components/Maze/Maze.svelte";
	import { selectedState } from "$stores/misc.js";

	const state = "Iowa";

	$: open = $selectedState !== undefined;
</script>

<div class="modal" class:open>
	<h2>{state}</h2>

	<div class="play">
		<div>Info tk</div>
		<Maze playable={true} />
	</div>
</div>

<style>
	.modal {
		display: none;
		position: fixed;
		width: 90%;
		margin: 4em auto;
		top: 0;
		left: 50%;
		transform: translate(-50%, 0);
		background: white;
	}
	.modal.open {
		display: block;
	}
	.play {
		display: grid;
		grid-template-columns: 200px 1fr;
	}
</style>
