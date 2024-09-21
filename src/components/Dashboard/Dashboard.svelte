<script>
	import Grid from "$components/Dashboard/Grid.svelte";
	import Bar from "$components/Dashboard/Bar.svelte";
	import Modal from "$components/Modal/Modal.svelte";
	import { setContext } from "svelte";
	import { writable } from "svelte/store";

	export let doneMessage;

	setContext("dashboard", {
		getOrder: () => order,
		getColumnWidth: () => columnWidth
	});

	const order = writable("geo");
	const columnWidth = writable(0);
</script>

<Grid {doneMessage} />
<Bar />
<Modal />

<style>
	:global(#dashboard) {
		position: relative;
	}
</style>
