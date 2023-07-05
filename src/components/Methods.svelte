<script>
	import _ from "lodash";
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
	import sources from "$data/sources.csv";

	const cols = ["metric", "source"];
</script>

<section id="methods">
	<h3>Methodology</h3>
	{#each copy.methodology as text}
		<p>{@html text[$language]}</p>
	{/each}

	<details>
		<summary><h3>Sources</h3></summary>

		<table>
			<tr>
				{#each cols as key}
					<th>{_.startCase(key)}</th>
				{/each}
			</tr>
			{#each sources as source}
				<tr>
					{#each cols as key}
						<td>
							{#if key === "source"}
								<a href={source.link} target="_blank">{source[key]}</a>
							{:else}
								{source[key]}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</table>
	</details>
</section>

<style>
	section {
		max-width: 700px;
		margin: auto;
		padding: 10rem 2rem;
	}
	h3 {
		font-size: 1.2rem;
		font-family: var(--font-heavy);
		text-transform: uppercase;
	}
	summary h3 {
		display: inline;
	}
	summary {
		margin-bottom: 1rem;
	}
	details {
		margin-top: 3rem;
	}
	summary:hover {
		cursor: pointer;
	}
	summary::marker {
		color: var(--color-pp-dark-purple);
	}
	p {
		color: var(--color-pp-text-gray);
	}
	th,
	td {
		padding: 0.5rem;
	}
	th {
		font-family: var(--font-bold);
		border-bottom: 3px solid var(--color-pp-dark);
	}
	tr {
		border-bottom: 1px solid var(--color-pp-gray-3);
	}
	td {
		vertical-align: middle;
	}
	td:last-child {
		font-size: 0.8rem;
	}
</style>
