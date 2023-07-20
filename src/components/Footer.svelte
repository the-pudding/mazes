<script>
	import copy from "$data/copy.json";
	import facebook from "$svg/facebook.svg";
	import twitter from "$svg/twitter.svg";
	import instagram from "$svg/instagram.svg";
	import youtube from "$svg/youtube.svg";
	import tiktok from "$svg/tiktok.svg";
	import ppfa from "$svg/WHITE_PPFA-primary-with-tagline-c3.svg";

	const { main, sub, columns, extra, copyright, social, call, donate } =
		copy.footer;
	const icons = { facebook, twitter, instagram, youtube, tiktok };
</script>

<footer>
	<div class="wrapper">
		<p class="main">{main}</p>
		<div class="sides">
			<div class="left">
				<div>
					<a
						href="https://www.plannedparenthood.org/"
						target="_blank"
						aria-label="link to planned parenthood website"
					>
						<div class="logo-wrapper">
							{@html ppfa}
						</div>
					</a>
					<div class="sub">{sub}</div>
				</div>

				<a href={call} class="button">call planned parenthood</a>
				<a href={donate} target="_blank" class="button">donate</a>

				<div class="socials">
					{#each social as { id, link }}
						<a
							href={link}
							target="_blank"
							class="social-link"
							aria-label={`link to planned parenthood's ${id}`}
						>
							{@html icons[id]}
						</a>
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
									<li class="link">
										<a href={link} target="_blank">{text}</a>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="bottom">
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
	.wrapper {
		max-width: 1200px;
		margin: auto;
	}
	.main {
		color: white;
		margin: 0;
		font-size: 1.1rem;
	}
	.logo-wrapper {
		width: 220px;
		margin: 0 0 0.5rem -1rem;
	}
	:global(.logo-wrapper svg) {
		width: 100%;
	}
	:global(.logo-wrapper svg path) {
		fill: white;
	}
	:global(.logo-wrapper svg:hover) {
		opacity: 0.5;
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
		margin-right: 8px;
		padding: 8px;
	}
	.social-link:hover {
		background: var(--color-pp-gray-1);
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
	}
	.column {
		padding: 0 0.8rem;
		flex: 1;
	}
	.title {
		color: white;
		text-transform: uppercase;
		font-size: 0.8rem;
		font-family: var(--font-bold);
	}
	.links {
		padding-top: 0.5rem;
	}
	.link {
		padding: 0.5rem 0;
	}
	a {
		border: none;
		color: var(--color-pp-gray-2);
	}
	a:hover {
		text-decoration: underline;
		color: white;
	}
	.bottom {
		display: flex;
		justify-content: space-between;
		border-top: 1px solid var(--color-pp-gray-2);
		padding-top: 1rem;
	}
	.bottom ul {
		display: flex;
		font-size: 0.8rem;
	}
	.bottom ul li {
		margin-left: 1rem;
	}
	.button {
		display: none;
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
	@media (max-width: 750px) {
		footer {
			padding: 3rem 1rem;
		}
		.main {
			text-align: center;
			max-width: 382px;
			margin: auto;
		}
		.left {
			flex-direction: column;
			align-items: start;
		}
		.socials {
			justify-content: center;
			margin: 1.5rem 0 0 0;
		}
		.social-link {
			margin-right: 1rem;
		}
		.social-link:last-of-type {
			margin-right: 0;
		}
		ul.columns {
			flex-direction: column;
		}
		.column {
			padding: 0;
			margin-bottom: 2rem;
		}
		.sides {
			margin-bottom: 0;
		}
		.bottom {
			border: none;
			flex-direction: column;
			align-items: center;
		}
		.bottom ul {
			margin-top: 2rem;
		}
		.button {
			display: flex;
			justify-content: center;
			width: 100%;
			font-family: var(--font-bold);
			border: 3px solid white;
			border-radius: 25px;
			color: white;
			text-transform: uppercase;
			padding: 0.5rem 1.3rem;
			margin-top: 1rem;
			transition: all calc(var(--1s) * 0.25) ease-out;
		}
		.button:hover {
			background: white;
			color: var(--color-pp-dark);
			text-decoration: none;
		}
	}
</style>
