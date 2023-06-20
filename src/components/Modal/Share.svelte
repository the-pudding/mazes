<script>
	import Icon from "$components/helpers/Icon.svelte";
</script>

<div class="share">
	SHARE <button><Icon name="share" /></button>
</div>

<style>
	.share {
		color: var(--color-pp-text-gray);
		font-family: var(--font-bold);
		display: flex;
		align-items: center;
	}
	.share button {
		background: var(--color-pp-light-navy);
		color: white;
		border-radius: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 0.5rem;
	}
	.share button:hover {
		background: var(--color-pp-text-gray);
	}
</style>
