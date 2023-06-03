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
		height: 3rem;
		color: white;
		background: var(--color-pp-dark);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
	}
	span {
		font-weight: bold;
	}
	.title {
		font-size: var(--24px);
	}
	.about {
		font-size: var(--16px);
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
			font-size: var(--16px);
			text-align: left;
			margin-right: 1em;
		}
	}
</style>
