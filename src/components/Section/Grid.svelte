<script>
	import Button from "$components/Button.svelte";
	import states from "$data/states.csv";
	import _ from "lodash";
	import { selectedState } from "$stores/misc.js";

	export let ids;

	const onClick = (e) => {
		const id = e.target.id.replace("-preview", "");
		$selectedState = id;
	};
	const onKeyDown = (e) => {
		if (e.keyCode === 13 || e.keyCode === 32) {
			const id = e.target.id.replace("-preview", "");
			$selectedState = id;
		}
	};
</script>

<div class="mazes">
	<div class="grid">
		{#each ids as id}
			{@const name = _.startCase(states.find((d) => d.id === id).name)}
			{@const ban = states.find((d) => d.id === id).ban === "true"}
			<div
				class="state"
				id={`${id}-preview`}
				on:click={onClick}
				on:keydown={onKeyDown}
				role="button"
				tabindex="0"
			>
				<div class="name">{name}</div>
				<div class="img-wrapper">
					<img
						src={`assets/img/states/${id}.png`}
						alt={`maze for ${id}`}
						class:hide={ban}
					/>
					{#if ban}<div class="black-box" />{/if}
				</div>
			</div>
		{/each}
	</div>
	<Button
		text="see all mazes"
		style="margin-top: 2rem"
		onClick={() => (location.href = "#dashboard")}
	/>
</div>

<style>
	.mazes {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 1rem 4px;
	}
	.name {
		text-align: center;
		color: var(--color-pp-text-gray);
	}
	.state:hover {
		cursor: pointer;
		background: var(--color-pp-gray-1);
		transition: all 0.2s ease-in;
	}
	.state:hover .name {
		color: black;
		font-family: var(--font-heavy);
		font-weight: 900;
		transition: all 0.2s ease-in;
	}
	img.hide {
		visibility: hidden;
	}
	.img-wrapper {
		position: relative;
		pointer-events: none;
	}
	.black-box {
		position: absolute;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: black;
	}

	@media (max-width: 800px) {
		.grid {
			width: 80%;
			max-width: 400px;
			gap: 1rem;
		}
	}
</style>
