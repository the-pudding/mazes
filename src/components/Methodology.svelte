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
					<th>Last Updated</th>
				</tr>
			</thead>
			<tbody>
				{#each sources as { source, metric, lastUpdated, link }, i}
					<tr>
						<td><span>{i+1}</span><a href={link} target="_blank">{metric}</a></td>
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
		padding: 0 1rem;
	}
	.inner {
		max-width: 700px;
		margin: 8rem auto;
		padding: 2rem 0;
	}
	h4 {
		font-family: var(--serif);
		font-size: var(--24px);
		font-weight: 700;
		color: var(--color-fg);
	}
	h4.sources {
		display: inline-block;
		margin: 1rem 0 0 0.25rem;
		transform: translateY(3px);
	}
	summary {
		cursor: pointer;
	}
	p {
		color: var(--color-fg);
		line-height: 1.5;
		font-size: var(--16px);
	}
	:global(#methodology a) {
		color: var(--color-fg);
	}
	:global(#methodology a:hover) {
		color: var(--color-dark-tan);
	}
	table {
		table-layout: auto;
		margin-top: 1rem;
		font-size: var(--12px);
	}
	thead {
		border-bottom: 3px solid var(--color-fg);
		text-transform: uppercase;
	}
	td,
	th {
		padding: 6px;
	}
	td {
		border-bottom: 1px solid var(--color-medium-tan);
		padding: 0.75rem 0;
	}
	td a {
		border-bottom: none;
		text-decoration: underline;
	}
	td span {
		margin: 0 0.5rem 0 0;
	}
	td:nth-child(2),
	td:nth-child(3) {
		white-space: nowrap;
	}

	@media (max-width: 700px) {
		thead {
			display: none;
		}

		tr {
			display: flex;
			flex-direction: column;
			border-bottom: 1px solid #ddd;
			padding: 0.5rem;
			border-bottom: 1px solid var(--color-medium-tan);
		}
		td {
			display: flex;
			justify-content: start;
			padding: 0;
			border: none;
		}
		td span {
			display: none;
		}
		td::before {
			content: attr(data-label); /* Adds label for accessibility */
			font-weight: bold;
		}
	}

	@media (max-width: 600px) {
		:global(#methodology) {
			height: auto;
		}
	}
</style>
