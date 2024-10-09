<script>
	import sources from "$data/sources.csv";

	export let title;
	export let content;
</script>

<div class="inner">
	<h4>{title}</h4>
	{#each content as { type, value }}
		<p>{@html value}</p>
	{/each}

	<details>
		<summary>
			<h4 class="sources">Sources</h4>
		</summary>

		<table>
			<thead>
				<tr>
					<th>Metric</th>
					<th>Source</th>
					<th>Last Updated</th>
				</tr>
			</thead>
			<tbody>
				{#each sources as { source, metric, lastUpdated, link }}
					<tr>
						<td>{metric}</td>
						<td><a href={link} target="_blank">{source}</a></td>
						<td>{lastUpdated}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</details>
</div>

<style>
	:global(#methodology) {
		display: flex;
		background: var(--color-tan);
		min-height: 100vh;
	}
	.inner {
		max-width: 700px;
		margin: auto;
		border-top: 1px solid var(--color-dark-tan);
		padding: 2rem 0;
	}
	h4 {
		font-family: var(--serif);
	}
	h4.sources {
		display: inline;
	}
	h4.sources:hover {
		cursor: pointer;
	}
	p {
		color: var(--color-dark-tan);
	}
	table {
		table-layout: auto;
		margin-top: 1rem;
	}
	thead {
		border-bottom: 3px solid var(--color-fg);
	}
	td,
	th {
		padding: 6px;
	}
	td:nth-child(2),
	td:nth-child(3) {
		white-space: nowrap;
	}

	@media (max-width: 600px) {
		:global(#methodology) {
			height: auto;
		}
	}
</style>
