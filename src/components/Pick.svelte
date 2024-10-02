<script>
	import stateData from "$data/states.csv";
	import { selectedState } from "$stores/misc.js";
	import arrowDownIcon from "$svg/arrow-down.svg";
	import _ from "lodash";

	export let hed;
	export let sub;
	export let stories;

	const onClick = async (id) => {
		document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });

		setTimeout(() => {
			$selectedState = id;
		}, 800);
	};
	const seeAll = () => {
		document.getElementById("dashboard").scrollIntoView({ behavior: "smooth" });
	};
</script>

<div class="title">
	<h2>{hed}</h2>
	<button class="sub" on:click={seeAll}>
		<span class="text">{sub}</span>
		<span class="icon">{@html arrowDownIcon}</span>
	</button>
</div>

<div class="stories">
	{#each stories as { id, age }}
		{@const state = _.startCase(stateData.find((d) => d.id === id).name)}
		{@const name = _.startCase(stateData.find((d) => d.id === id).story)}
		<div class="story" on:click={() => onClick(id)}>
			<img
				src={`assets/img/states/${id}.png`}
				alt={`maze representing abortion restrictions in ${state}`}
			/>
			<div class="name">{name}</div>
			<div class="info">{state}, {age}</div>
		</div>
	{/each}
</div>

<style>
	:global(#pick) {
		max-width: 800px;
		margin: 0 auto;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
	}
	.title {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h2 {
		font-family: var(--serif);
		font-weight: bold;
	}
	.stories {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		grid-gap: 3rem;
	}
	.story {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
	}
	.story:hover {
		cursor: pointer;
		outline: 3px solid var(--color-accent-orange);
		border-radius: 5px;
	}
	.name {
		font-family: var(--serif);
		font-size: 2rem;
	}
	.sub {
		color: var(--color-fg);
		padding: 0;
		background: none;
		border-radius: 0;
		display: flex;
		align-items: center;
	}
	.text {
		text-decoration: underline;
	}
	.icon {
		height: 17px;
		width: 17px;
		margin-left: 4px;
		display: flex;
	}

	@media (max-width: 600px) {
		.stories {
			grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
			grid-gap: 1.5rem;
		}
		.title {
			margin-bottom: 2rem;
		}
	}
</style>
