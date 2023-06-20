<script>
	import Icon from "$components/helpers/Icon.svelte";
	import copy from "$data/copy.json";
	import viewport from "$stores/viewport";

	const { title } = copy;

	$: mobile = $viewport.width < 600;
</script>

<header>
	<div class="title">
		<span>{title.split(" ").slice(0, 2).join(" ").toUpperCase()}</span>
		{title.split(" ").slice(2).join(" ").toUpperCase()}
	</div>

	{#if mobile}
		<button class="btn-open">
			<Icon name="menu" />
		</button>
	{:else}
		<div class="about">ABOUT</div>
	{/if}
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
		z-index: 10000;
	}
	span {
		font-family: var(--font-heavy);
	}
	.title {
		font-size: 1.3rem;
	}
	.about {
		font-size: 1rem;
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

	@media (max-width: 600px) {
		.title {
			font-size: 1rem;
			text-align: left;
			margin-right: 1em;
		}
	}
</style>
