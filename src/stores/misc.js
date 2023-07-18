import { writable } from "svelte/store";

export const language = writable("english");

export const mazeData = writable({});

export const selectedState = writable(undefined);

export const pathLength = writable(0);

export const scrollStep = writable(undefined);
export const direction = writable("down");

export const dashboardInView = writable(false);
export const storyInView = writable(true);
