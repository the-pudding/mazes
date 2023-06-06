<script>
	import TopBar from "$components/Dashboard/TopBar.svelte";
	import states from "$data/states.csv";
	import viewport from "$stores/viewport.js";

	$: mobile = $viewport.width < 600;

	let order = "geographically";
	let highlight = "KS";
</script>

<div class="full-page">
	<TopBar bind:order bind:highlight />
	<figure>
		{#each states as { id, name, row, col }}
			{@const label = mobile ? name : id}
			<div
				class="state"
				class:highlighted={highlight === id}
				id={id.toLowerCase()}
				style={`--row: ${row}; --col: ${col}`}
			>
				<div class="abbrev">{label}</div>
				<img src={"assets/img/iowa-100.png"} />
			</div>
		{/each}
	</figure>
</div>

<style>
	.full-page {
		min-height: 100vh;
		display: grid;
		grid-template-rows: 80px 1fr;
	}

	figure {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		grid-template-rows: repeat(8, 1fr);
		max-width: 900px;
		margin: auto;
		padding: 0 1rem;
	}
	.state {
		display: flex;
		flex-direction: column;
		align-items: center;
		grid-row: var(--row);
		grid-column: var(--col);
		padding: 0.25rem;
	}
	.highlighted {
		outline: 3px solid var(--color-pp-magenta);
		border-radius: 5px;
	}
	.highlighted .abbrev {
		font-weight: 900;
		color: black;
	}
	.abbrev {
		font-family: var(--sans);
		color: var(--color-gray-400);
		text-align: center;
	}

	@media (max-width: 800px) {
		.state {
			font-size: 0.8rem;
		}
	}
	@media (max-width: 600px) {
		figure {
			grid-template-columns: repeat(3, 1fr);
			gap: 1rem;
		}
		.state {
			grid-row: auto;
			grid-column: auto;
			font-size: 1rem;
		}
	}
</style>
