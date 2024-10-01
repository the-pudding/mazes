import { writable, derived } from "svelte/store";

export const mazeData = writable({});
export const selectedState = writable(undefined);
export const pathLength = writable(0);
export const globalGameState = writable("pre");
export const revealMethods = writable(false);
export const nSolvedTemp = writable(0);

export const currentMazeSize = derived(
	[mazeData, selectedState],
	([$mazeData, $selectedState]) => {
		const arrayLength = $mazeData[$selectedState]?.length || 0;
		return Math.sqrt(arrayLength);
	}
);
