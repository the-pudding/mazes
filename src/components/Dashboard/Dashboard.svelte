<script>
	import Grid from "$components/Dashboard/Grid.svelte";
	import Bar from "$components/Dashboard/Bar.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import viewport from "$stores/viewport.js";

	export let doneMessage;

	setContext("dashboard", {
		getOrder: () => order,
		getColumnWidth: () => columnWidth
	});

	const order = writable("geo");
	const columnWidth = writable(0);

	$: mobile = $viewport.width < 600;
	$: if (mobile) $order = "alpha";
</script>

<Grid {doneMessage} />
<Bar />
<Modal />

<style>
	:global(#dashboard) {
		position: relative;
	}
</style>
