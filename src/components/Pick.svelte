<script>
	import stateData from "$data/states.csv";
	import { selectedState } from "$stores/misc.js";
	import arrowDownIcon from "$svg/arrow-down.svg";
	import plusIcon from "$svg/plus.svg";
	import _ from "lodash";
	import mq from "$stores/mq.js";

	export let hed;
	export let sub;
	export let stories;
	export let directionsA;
	export let directionsB;

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
			<span>{directionsA}</span>
			<span class="icon">{@html plusIcon}</span>
		</p>
		<p class="or">OR</p>
		<button class="sub" on:click={seeAll}>
			<span class="text">{directionsB}</span>
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
					alt={`a line art illustration of ${name}, a ${age}-year-old from ${state}`}
				/>
				<div class="plus-add">
					{@html plusIcon}
				</div>
			</div>
			<div class="name">{name}</div>
			<div class="info">{state}, {age}</div>
		</button>
	{/each}
</div>

<style>
	:global(#pick) {
		width: 100%;
		padding: 4rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-top: 1px solid var(--color-tan);
		border-bottom: 1px solid var(--color-tan);
		margin-bottom: 8rem;
	}
	.title,
	.stories {
		transition: opacity calc(var(--1s) * 0.3);
		max-width: 780px;
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
		font-size: var(--36px);
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
	.directions .or {
		font-weight: 700;
		margin: 0 0.5rem;
		font-size: var(--14px);
	}
	.stories {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		align-items: center;
		justify-content: center;
	}
	.story {
		width: calc(33.33% - 1rem);
		max-width: 200px;
		background: none;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.story:hover {
		cursor: pointer;
	}
	.img-wrapper {
		position: relative;
		width: 100%;
		aspect-ratio: 1;
		margin-bottom: 0.5rem;
	}
	.plus-add {
		position: absolute;
		top: calc(20% - 1rem);
		right: calc(10% - 1rem);
		height: 1.75rem;
		width: 1.75rem;
		border-radius: 50%;
		border: 2px solid var(--color-bg);
		z-index: 1000;
		background: var(--color-bg);
		opacity: 0;
		transition: opacity calc(var(--1s) * 0.2);
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
	.story:hover .plus-add {
		opacity: 1;
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
	.sub:hover .text {
		color: var(--color-accent-purple);
	}
	:global(.sub:hover .icon svg path) {
		fill: var(--color-accent-purple);
	}
	:global(.sub:hover .icon) {
		transform: translateY(2px);
		transition: transform 100ms ease-out;
	}
	.text {
		text-decoration: underline;
	}
	.icon {
		height: 20px;
		width: 17px;
		margin-left: 4px;
		display: flex;
	}
	:global(.sub .icon svg path) {
		fill: var(--color-fg);
	}

	@media (max-width: 700px) {
		:global(#pick) {
			margin-bottom: 2rem;
		}
		h2 {
			font-size: var(--24px);
		}
		.desc {
			font-size: var(--12px);
		}
		.directions p,
		.sub {
			font-size: var(--16px);
		}
		.stories {
			gap: 0;
		}
		.story {
			width: 50%;
			padding: 0;
		}
	}
</style>
