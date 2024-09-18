<script>
	export let hed;
	export let sub;
	export let stories;
</script>

<p>{hed}</p>
<p>{sub}</p>
{#each stories as { name, state, age }}
	<p>{name}, {state}, {age}</p>
{/each}
