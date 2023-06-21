<script>
	import copy from "$data/copy.json";

	const { main, sub, columns, extra, copyright, social } = copy.footer;
</script>

<footer>
	<div class="container">
		<p class="main">{main}</p>
		<div class="sides">
			<div class="left">
				<div>
					<a href="https://www.plannedparenthood.org/" target="_blank">
						<img src="assets/img/ppfa-logo.png" />
					</a>
					<div class="sub">{sub}</div>
				</div>

				<div class="socials">
					{#each social as { id, link }}
						<a href={link} target="_blank" class="social-link">{id}</a>
					{/each}
				</div>
			</div>
			<div class="right">
				<ul class="columns">
					{#each columns as { title, titleLink, links }}
						<li class="column">
							<a href={titleLink} target="_blank" class="title">{title}</a>
							<ul class="links">
								{#each links as { text, link }}
									<li class="link"><a href={link}>{text}</a></li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="lower">
			<div>{copyright}</div>
			<ul>
				{#each extra as { text, link }}
					<li><a href={link} target="_blank">{text}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</footer>

<style>
	footer {
		background-color: var(--color-pp-dark);
		color: var(--color-pp-gray-2);
		padding: 5rem 3rem;
		font-size: 0.9rem;
	}
	.container {
		max-width: 1200px;
		margin: auto;
	}
	.main {
		color: white;
		margin: 0;
		font-size: 1.1rem;
	}
	img {
		width: 220px;
		margin-bottom: 1.5rem;
	}
	.socials {
		width: 100%;
		display: flex;
		margin-top: 1rem;
	}
	.social-link {
		background: var(--color-pp-gray-3);
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-right: 6px;
	}
	.sides {
		display: flex;
		flex-direction: row;
		margin: 4rem 0;
	}
	.left,
	.right {
		width: 50%;
	}
	.left {
		display: flex;
		flex-direction: column;
		align-items: start;
		padding-right: 3rem;
	}
	ul {
		padding: 0;
		list-style-type: none;
	}
	ul.columns {
		width: 100%;
		display: flex;
		flex-wrap: no-wrap;
	}
	.column {
		padding: 0 0.8rem;
		flex: 1;
	}
	.title {
		color: white;
		text-transform: uppercase;
		font-size: 0.8rem;
	}
	.link {
		margin-top: 1rem;
	}
	a {
		border: none;
		color: var(--color-pp-gray-2);
	}
	a:hover {
		text-decoration: underline;
		color: white;
	}
	.lower {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid var(--color-pp-gray-2);
		padding-top: 1rem;
	}
	.lower ul {
		display: flex;
		font-size: 0.8rem;
	}
	.lower ul li {
		margin-left: 1rem;
	}

	@media (max-width: 1000px) {
		.sides {
			flex-direction: column;
		}
		.left,
		.right {
			width: 100%;
		}
		.left {
			padding: 0;
			margin-bottom: 3rem;
			flex-direction: row;
			align-items: center;
		}
		.socials {
			margin: 0 0 0 4rem;
			justify-content: flex-end;
		}
	}
	@media (max-width: 800px) {
		/* mobile version */
	}
</style>
