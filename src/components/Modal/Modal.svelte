<script>
	import Maze from "$components/Maze/Maze.svelte";

	const state = "Iowa";
</script>

<div class="modal">
	<h2>{state}</h2>

	<div class="play">
		<div>Info tk</div>
		<Maze playable={true} />
	</div>
</div>

<style>
	.modal {
		width: 90%;
		margin: 4em auto;
	}
	.play {
		display: grid;
		grid-template-columns: 200px 1fr;
	}
</style>
