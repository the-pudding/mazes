import { csv } from "d3";
import { mazeData } from "$stores/misc.js";
import { get } from "svelte/store";

const loadMazeData = async (id) => {
	if (get(mazeData)[id]) {
		return get(mazeData)[id];
	}

	let data = await csv(`assets/data/${id}.csv`);
	data = data.map((d) => ({
		row: +d.row,
		col: +d.col,
		solutionIndex: +d.solutionIndex,
		walls: d.walls.split("|").map((w) => (w === "t" ? true : false))
	}));
	mazeData.update((d) => ({ ...d, [id]: data }));

	return data;
};

export default loadMazeData;
