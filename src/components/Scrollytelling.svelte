<script>
	export let steps;
</script>

{#each steps as { value }}
	<p>{@html value}</p>
{/each}
