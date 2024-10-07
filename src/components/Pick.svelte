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

<div class="title" class:fade={$selectedState}>
	<h2>{hed}</h2>
	<button class="sub" on:click={seeAll}>
		<span class="text">{sub}</span>
		<span class="icon">{@html arrowDownIcon}</span>
	</button>
</div>

<div class="stories" class:fade={$selectedState}>
	{#each stories as { id, age }}
		{@const state = _.startCase(stateData.find((d) => d.id === id).name)}
		{@const name = _.startCase(stateData.find((d) => d.id === id).story)}
		<div class="story" on:click={() => onClick(id)}>
			<div class="img-wrapper">
				<div class="img-absolute img-bg" />
				<img
					class="img-absolute img-maze"
					src={`assets/img/states/${id}.png`}
					alt={`maze representing abortion restrictions in ${state}`}
				/>
				<img
					class="img-absolute img-person"
					src={`assets/img/stories/${name.toLowerCase()}.png`}
					alt={`a line art illustration of ${name}, a ${age}-year-olf from ${state}`}
				/>
			</div>
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
	.title,
	.stories {
		transition: opacity calc(var(--1s) * 0.3);
	}
	.fade {
		opacity: 0.2;
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
		grid-gap: 1rem;
	}
	.story {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
	}
	.story:hover {
		cursor: pointer;
	}
	.img-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
	}
	.img-absolute {
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.img-bg {
		width: 80%;
		aspect-ratio: 1;
		left: 50%;
		transform: translate(-50%, 0);
		background-color: #dfd8ff;
		transition: background-color calc(var(--1s) * 0.3);
	}
	.story:hover .img-bg {
		cursor: pointer;
		background-color: #9181d4;
	}
	.img-maze {
		width: 80%;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 0);
	}
	.img-person {
		width: 100%;
		max-width: none;
		left: 50%;
		bottom: -10.5%;
		transform: translate(-50%, 0);
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
