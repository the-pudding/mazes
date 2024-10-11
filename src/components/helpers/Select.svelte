<script>
	export let options = [];
	export let label = "";
	export let disabled = false;
	export let value = options.length ? options[0].value : "";

	const id = `select-${Math.floor(Math.random() * 1000000)}`;
</script>

<div class="select">
	{#if label}
		<label for={id}>{label}</label>
	{/if}
	<select {id} bind:value {disabled}>
		{#each options as option}
			<option
				value={option.value}
				disabled={option.disabled !== undefined ? option.disabled : false}
				>{option.label}</option
			>
		{/each}
	</select>
</div>

<style>
	.select {
		position: relative;
		display: flex;
		align-items: center;
	}

	label {
		display: inline-block;
		font-family: inherit;
		font-weight: inherit;
		font-size: var(--12px);
		margin-right: 0.75em;
		text-align: right;
		text-transform: uppercase;
	}
	select {
		/* width: 100%; */
		height: 40px;
		font-family: inherit;
		font-size: var(--14px);
		cursor: pointer;
		background: var(--color-bg);
		color: var(--color-fg);
		border-radius: 3px;
		padding: 0.5em 2rem 0.5em 0.5em;
		appearance: none;
		line-height: 1.4;
	}
	/* select:nth-of-type(1) {
		width: 13.5rem;
	} */
	select::-ms-expand {
		display: none;
	}

	.select::after {
		display: block;
		content: "";
		position: absolute;
		bottom: 1.25em;
		right: 0.75em;
		width: 0.75em;
		height: 0.75em;
		z-index: 1;
		background: var(--color-fg);
		clip-path: polygon(0% 0%, 100% 100%, 0% 100%);
		border-radius: 1px;
		transform-origin: center center;
		transform: rotate(-45deg);
		pointer-events: none;
	}

	select:hover {
		outline: 1px solid var(--color-focus);
	}

	select:focus {
		box-shadow: 0 0 4px 0 var(--color-focus);
	}

	.select:disabled {
		cursor: not-allowed;
		background-color: var(--color-gray-300);
	}

	@media (max-width: 600px) {
		select {
			height: 32px;
		}
		.select::after {
			bottom: 1em;
			width: 0.75em;
			height: 0.75em;
			border-radius: 2px;
		}
	}

	@media (max-width: 500px) {
		label {
			width: 2.5rem;
			text-align: right;
		}
	}
</style>
