<script>
	import copy from "$data/copy.json";
	import { language, selectedState } from "$stores/misc.js";
	import story from "$svg/story.svg";
	import maze from "$svg/maze.svg";

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
		<p class="dir">Go to</p>
		<button id="story" on:click={() => (location.href = "#a-right-removed")}>
			<p>Story</p>
			{@html story}
		</button>
		<button id="maze" on:click={() => (location.href = "#dashboard")}>
			<p>Mazes</p>
			{@html maze}
		</button>
		<!-- <button on:click={toggleLanguage}
			>{$language === "english" ? "Español" : "English"}</button
		> -->
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
	.about {
		display: flex;
		flex-direction: row;
	}
	.dir {
		text-transform: uppercase;
		font-family: var(--font-bold);
		font-weight: 700;
		font-size: 0.8rem;
		color: var(--color-pp-gray-1);
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
		border-radius: 100%;
		border: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0 0 0 0.5rem;
	}
	button p {
		color: var(--color-pp-gray-1);
		text-transform: none;
		font-size: 0.8rem;
	}
	button:hover {
		opacity: 0.5;
	}
	:global(.about svg) {
		margin: 0 0 0 0.25rem;
	}
	:global(.about svg line, .about svg path, .about svg rect, .about svg polyline) {
		stroke: var(--color-pp-gray-1);
	}

	:global(.about button:hover svg line, .about button:hover svg path, .about button:hover svg rect, .about button:hover svg polyline) {
		opacity: 0.5;
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
		.dir {
			display: none;
		}
	}
	@media (max-width: 450px) {
		.about p {
			display: none;
		}
	}
</style>
