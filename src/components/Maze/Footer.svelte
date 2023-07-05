<script>
	import KeysDesktop from "$components/Maze/Keys.Desktop.svelte";
	import Button from "$components/Button.svelte";
	import Share from "$components/Modal/Share.svelte";
	import { getContext, tick } from "svelte";
	import _ from "lodash";
	import viewport from "$stores/viewport.js";

	const { getDims, getData, getGameState, getLocation, getPath } =
		getContext("maze");
	const data = getData();
	const gameState = getGameState();
	const location = getLocation();
	const path = getPath();
	const dims = getDims();

	const start = () => {
		$gameState = "mid";
	};
	const reset = () => {
		$gameState = "mid";
		$location = { row: 0, col: 0 };
	};
	const solve = async () => {
		const solution = _.orderBy(
			$data.filter((d) => d.solutionIndex !== null),
			"solutionIndex",
			"asc"
		);
		$path = solution;
		$gameState = "post";
		$location = { row: $dims - 1, col: $dims - 1 };

		await tick();
		const readMoreLink = document.getElementById("read-more");
		readMoreLink.focus();
	};

	$: mobile = $viewport.width < 600;
	$: buttonText = $gameState === "pre" ? "start maze" : "restart maze";
</script>

<div class="footer" class:visible={$gameState !== "pre"}>
	<div class="buttons">
		<Button text={buttonText} onClick={$gameState === "pre" ? start : reset} />
		<button
			class="complete text"
			on:click={solve}
			disabled={$gameState === "post"}>Complete the maze</button
		>
	</div>

	{#if mobile}
		<Share />
	{:else}
		<KeysDesktop />
	{/if}
</div>

<style>
	.footer {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 3rem;
		opacity: 0.1;
	}
	.visible {
		opacity: 1;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: start;
		margin-right: 1rem;
	}
	.text {
		font-size: 0.9rem;
		color: var(--color-pp-text-gray);
		margin-top: 4px;
		text-align: center;
	}
	button.complete {
		background: none;
	}
	button.complete:hover {
		color: black;
	}

	@media (hover: hover) and (pointer: fine) {
		.bottom {
			margin-top: 1rem;
		}
	}
</style>
