<script>
	import stateData from "$data/states.csv";
	import { selectedState } from "$stores/misc.js";
	import arrowDownIcon from "$svg/arrow-down.svg";
	import touchIcon from "$svg/touch.svg";
	import _ from "lodash";
	import mq from "$stores/mq.js";

	export let hed;
	export let sub;
	export let stories;
	export let directions;

	const onClick = async (id) => {
		document
			.getElementById("dashboard")
			.scrollIntoView({ behavior: $mq.reducedMotion ? "instant" : "smooth" });
		setTimeout(() => {
			$selectedState = id;
		}, 800);
	};
	const seeAll = () => {
		document
			.getElementById("dashboard")
			.scrollIntoView({ behavior: $mq.reducedMotion ? "instant" : "smooth" });
	};
</script>

<div class="title" class:fade={$selectedState}>
	<h2>{@html hed}</h2>
	<p class="desc">{@html sub}</p>
	<div class="directions">
		<p>
			<span>Select a story</span>
			<span class="icon">{@html touchIcon}</span>
		</p>
		<button class="sub" on:click={seeAll}>
			<span class="text">{directions}</span>
			<span class="icon">{@html arrowDownIcon}</span>
		</button>
	</div>
</div>

<div class="stories" class:fade={$selectedState}>
	{#each stories as { id, age }}
		{@const state = _.startCase(stateData.find((d) => d.id === id).name)}
		{@const name = _.startCase(stateData.find((d) => d.id === id).story)}
		<button class="story" on:click={() => onClick(id)}>
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
		</button>
	{/each}
</div>

<style>
	:global(#pick) {
		width: 100%;
		max-width: 780px;
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
		font-weight: 300;
		max-width: 40rem;
	}
	.desc {
		max-width: 30rem;
		font-size: var(--14px);
		margin: 0;
		font-style: italic;
	}
	.directions {
		display: flex;
		flex-direction: row;
		margin: 1rem 0;
		gap: 0.5rem;
	}
	.directions p {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: var(--20px);
	}
	.stories {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
		grid-gap: 1rem;
	}
	.story {
		background: none;
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
		transition: background-color calc(var(--1s) * 0.2);
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
		font-size: var(--20px);
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
	:global(.sub .icon svg path) {
		fill: var(--color-fg);
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
