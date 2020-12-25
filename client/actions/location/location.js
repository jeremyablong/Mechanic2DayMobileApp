import { LOCATION_GATHER } from "../types.js";

export const gatherLocationOnLoad = (item) => {
	return {
		type: "LOCATION_GATHER",
		payload: item
	}
}