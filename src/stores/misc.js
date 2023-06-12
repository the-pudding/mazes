import { writable } from "svelte/store";

export const mazeData = writable({});
export const selectedState = writable(undefined);
export const pathLength = writable(0);
