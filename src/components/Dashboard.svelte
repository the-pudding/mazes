<script>
	import states from "$data/states.json";
</script>

<figure>
	{#each states as { id, state, row, col }}
		<div
			class="state"
			id={id.toLowerCase()}
			style={`--row: ${row}; --col: ${col}`}
		>
			<div class="abbrev">{id}</div>
			<img src={"assets/img/iowa-100.png"} />
		</div>
	{/each}
</figure>

<style>
	figure {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(8, 1fr);
		gap: 1%;
		max-width: 1000px;
		margin: auto;
	}
	.state {
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-row: var(--row);
		grid-column: var(--col);
	}
	.abbrev {
		font-family: var(--sans);
		color: var(--color-gray-400);
	}
</style>
