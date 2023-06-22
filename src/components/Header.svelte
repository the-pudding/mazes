<script>
	import copy from "$data/copy.json";
	import { language } from "$stores/misc.js";

	const { title } = copy;

	const toggleLanguage = () => {
		$language = $language === "english" ? "spanish" : "english";
	};
</script>

<header>
	<div class="title">
		<span>{title.split(" ").slice(0, 2).join(" ").toUpperCase()}</span>
		{title.split(" ").slice(2).join(" ").toUpperCase()}
	</div>

	<div class="about">
		<button on:click={toggleLanguage}
			>{$language === "english" ? "Español" : "English"}</button
		>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		width: 100%;
		height: 3rem;
		color: white;
		background: var(--color-pp-dark);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		z-index: 10000;
	}
	span {
		font-family: var(--font-heavy);
	}
	.title {
		font-size: 1.3rem;
	}
	.btn-open {
		top: 0;
		position: sticky;
		width: 2em;
		height: 2em;
		margin: 0;
		padding: 0;
		background: transparent;
		color: var(--color-body);
		z-index: var(--z-overlay);
	}
	.btn-open:hover {
		color: var(--color-accent);
	}
	button {
		background: none;
		border: none;
		color: white;
	}
	button:hover {
		color: var(--color-pp-gray-1);
	}

	@media (max-width: 600px) {
		.title {
			font-size: 1rem;
			text-align: left;
			margin-right: 1em;
		}
		.about {
			font-size: 0.8rem;
		}
	}
</style>
