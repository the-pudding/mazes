<script>
	import _ from "lodash";
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";
	import sources from "$data/sources.csv";

	const cols = ["metric", "source", "link"];
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
							{#if key === "link"}
								<a href={source[key]} target="_blank">Link</a>
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
	a:hover {
		color: var(--color-pp-magenta);
	}
	summary::marker {
		color: var(--color-pp-magenta);
	}
	p {
		color: var(--color-pp-text-gray);
	}
	th,
	td {
		padding: 0.5rem;
		background: var(--color-pp-gray-1);
		border: 1px solid var(--color-pp-text-gray);
	}
</style>
