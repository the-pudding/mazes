<script>
	import copy from "$data/copy.json";
	import { language, selectedState } from "$stores/misc.js";

	const { headerTitle } = copy;

	const toggleLanguage = () => {
		$language = $language === "english" ? "spanish" : "english";
	};

	$: faded = $selectedState !== undefined;
</script>

<header class:faded>
	<div class="title">
		{@html headerTitle[$language]}
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
		z-index: 999;
	}
	header.faded {
		background: var(--color-pp-gray-3);
	}
	.title {
		font-size: 1.3rem;
		text-transform: uppercase;
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
			font-size: 0.85rem;
			text-align: left;
			margin-right: 1em;
		}
		.about {
			font-size: 0.8rem;
		}
	}
</style>
