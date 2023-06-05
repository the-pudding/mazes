<script>
	import Intro from "$components/Intro.svelte";
	import Scroll from "$components/Scroll.svelte";
</script>

<article>
	<div class="above">
		<Intro />
		<Scroll />

		<div style="height: 100vh;" />
	</div>
</article>

<style>
	.above {
		background: var(--upper-bg);
	}
</style>
