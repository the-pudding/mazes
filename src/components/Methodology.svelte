<script>
	import sources from "$data/sources.csv";
	import viewport from "$stores/viewport.js";
	import activityBook from "$svg/activity-book.svg";
	import { base } from "$app/paths";

	export let title;
	export let content;

	const downloadPdf = () => {
		document.getElementById("pdf-link").click();
	};

	$: mobile = $viewport.width < 600;
</script>

<div class="inner">
	<button class="activity" on:click={downloadPdf}>
		<img class="book-img" src="{base}/assets/activity_book.jpg" alt="the front cover of the abortion maze activity book" />
		<div>Download an activity book of all the state mazes.</div>
		<a
			href={`${base}/assets/AbortionMazeBook_ThePudding.pdf`}
			download
			id="pdf-link"
			style="display:none">download pdf</a
		>
	</button>

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
						<td
							><span>{i + 1}</span><a href={link} target="_blank">{metric}</a
							></td
						>
						<td>{mobile ? "Last updated: " : ""}{lastUpdated}</td>
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
		position: relative;
	}
	.inner {
		max-width: 700px;
		margin: 8rem auto;
		padding: 0 0 2rem 0;
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
	details {
		margin-bottom: 2rem;
	}
	p {
		color: var(--color-fg);
		line-height: 1.5;
		font-size: var(--16px);
	}
	.activity {
		background: #dfd8ff;
		margin: 0 auto 5rem auto;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 320px;
		transform: translateY(0);
		transition: transform calc(var(--1s) * 0.2) ease-out;
		border-radius: 3px;
		position: relative;
	}
	.book-img {
		width: 80px;
		position: absolute;
		left: -0.35rem;
		transform: rotate(-2deg);
		border: 1px solid var(--color-accent-purple);
		border-radius: 3px;
		transition: transform calc(var(--1s) * 0.2) ease-out;
	}
	.activity div {
		color: var(--color-fg);
		text-align: left;
		font-weight: bold;
		padding-left: 75px;
	}
	.activity:hover {
		transform: translateY(-5px);
	}
	.activity:hover div {
		color: var(--color-accent-purple);
	}

	.activity:hover .book-img {
		color: var(--color-accent-purple);
		transform: rotate(2deg);
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

	@media (max-width: 600px) {
		:global(#methodology) {
			height: auto;
		}

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

	@media (max-width: 400px) {
		.activity {
			width: 260px;
		}
		.activity div {
			font-size: var(--12px);
		}
		.activity .book-img {
			width: 70px;
		}
	}
</style>
