<script>
	import Icon from "$components/helpers/Icon.svelte";

	export let thumb;
	export let text;
</script>

<div class="fact">
	<div class="thumb" class:good={thumb === "up"}>
		<Icon name={`thumbs-${thumb}`} />
	</div>
	{text}
</div>

<style>
	.fact {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
		padding: 1rem;
		border: 1px solid #e8e5e1;
		box-shadow: 0px 0px 5px rgba(124, 115, 115, 0.1);
	}
	.thumb {
		background: var(--color-pp-text-gray);
		border-radius: 100%;
		display: flex;
		padding: 4px;
		margin-right: 0.6rem;
	}
	.good {
		background: var(--color-pp-magenta);
	}
</style>
