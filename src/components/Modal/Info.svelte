<script>
	import Facts from "$components/Modal/Facts.svelte";
	import { selectedState } from "$stores/misc.js";
	import stateData from "$data/states.csv";
	import factsData from "$data/facts.csv";
	import _ from "lodash";
	import shareIcon from "$svg/share.svg";
	import checkIcon from "$svg/check.svg";

	const sampleFacts = factsData.filter((d) => d.id === "tn");

	$: name = _.startCase(stateData.find((d) => d.id === $selectedState).name);
	$: story = stateData.find((d) => d.id === $selectedState).story;
	$: guttmacherLink = stateData.find((d) => d.id === $selectedState).guttmacher;
	$: facts = story
		? factsData
				.filter((d) => d.id === $selectedState)
				.map((d) => ({ fact: d.fact.replaceAll("NAME", _.startCase(story)) }))
		: factsData.filter((d) => d.id === $selectedState).length > 0
		? factsData.filter((d) => d.id === $selectedState)
		: sampleFacts;
</script>

<div class="info">
	<div class="header">
		<div class="title">
			<h2>{name}</h2>
			{#if story}
				<div class="story">
					{_.startCase(story)}'s story
					<span class="icon">{@html checkIcon}</span>
				</div>
			{/if}
		</div>

		<div class="classification">
			... is one of the <strong>least complex</strong> states for navigating abortion
			access and other related policies. The state does not restrict abortion based
			on gestational duration.
		</div>
	</div>

	<Facts {facts} />

	<div class="learn">
		<span>Learn more about this</span>
		<a href={guttmacherLink} target="_blank">state’s abortion policies</a>
		and
		<span class="share">
			<a href="/">share this state’s maze</a>
			<span class="icon">{@html shareIcon}</span>
		</span>
	</div>
</div>

<style>
	.info {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-between;
		gap: 1.5rem;
		height: 100%;
	}
	.title {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	h2 {
		font-family: var(--serif);
		font-weight: bold;
		font-size: 3rem;
	}
	.story {
		background: var(--color-accent-purple);
		color: var(--color-bg);
		border-radius: 5px;
		padding: 6px 8px;
		font-weight: bold;
		display: flex;
		align-items: center;
		white-space: nowrap;
	}
	.learn {
		display: flex;
		flex-wrap: wrap;
		gap: 0 4px;
		align-items: baseline;
		color: var(--color-dark-tan);
		font-size: 0.9rem;
		width: 520px;
	}
	.share {
		display: flex;
		align-items: center;
	}
	.share .icon {
		display: flex;
		height: 20px;
		width: 20px;
		margin-left: 6px;
	}
	.story .icon {
		display: flex;
		height: 16px;
		width: 16px;
		margin-left: 6px;
	}
	a {
		line-height: 1;
	}
	span,
	a {
		white-space: nowrap;
	}
</style>
