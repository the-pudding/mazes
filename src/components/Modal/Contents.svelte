<script>
	import Maze from "$components/Maze/Maze.svelte";
	import Facts from "$components/Modal/Facts.svelte";
	import Icon from "$components/helpers/Icon.svelte";
	import Share from "$components/Modal/Share.svelte";
	import { selectedState } from "$stores/misc.js";
	import data from "$data/iowa.json";
	import states from "$data/states.csv";
	import copy from "$data/copy.json";

	const { modalNote } = copy;

	$: state = states.find((d) => d.id === $selectedState)?.name;
	$: guttmacherLink = states.find((d) => d.id === $selectedState)?.guttmacher;
</script>

<div class="title">
	<h2>{state}</h2>
	<div>
		...is one of the <strong>most restrictive</strong> states for abortion access.
	</div>
</div>

<div class="play">
	<div class="maze">
		<Maze wallData={data} size={data.length} playable={true} animated={false} />
	</div>
</div>
<div class="facts">
	<Facts mazeSize={data.length} />
</div>

<div class="bottom">
	<div class="left">
		<a href={guttmacherLink} target="_blank"
			>Read more about {state}'s abortion policies
			<span><Icon name="external-link" /></span></a
		>
		<div class="note">
			{@html modalNote}
		</div>
	</div>

	<Share />
</div>

<style>
	.title {
		grid-area: top;
	}
	.facts {
		grid-area: side;
		overflow: scroll;
	}
	.play {
		grid-area: main;
		display: flex;
		justify-content: center;
	}
	.maze {
		width: 100%;
		max-width: 380px;
	}
	.bottom {
		grid-area: bottom;
		color: var(--color-pp-text-gray);
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.left {
		max-width: 600px;
		margin-right: 3rem;
	}
	.left a {
		color: var(--color-pp-text-gray);
	}
	.left a:hover {
		color: black;
	}
	.left a span {
		font-size: 0.65rem;
	}
	h2 {
		font-weight: 900;
		font-size: 3rem;
		margin-bottom: 0;
	}
	.title div {
		font-size: 1.3rem;
	}
	.note {
		margin-top: 1rem;
	}

	@media (max-width: 600px) {
		.play {
			width: 100%;
			margin-top: 2rem;
		}
		.bottom {
			display: none;
		}
		h2 {
			font-size: 2rem;
		}
		.title div {
			font-size: 1rem;
		}
		.maze {
			max-width: 280px;
		}
	}
</style>
