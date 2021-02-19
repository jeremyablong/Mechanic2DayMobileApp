import { LOCATION_GATHER, SAVE_LOCATION } from "../types.js";

export const gatherLocationOnLoad = (item) => {
	return {
		type: "LOCATION_GATHER",
		payload: item
	}
}
export const saveUsersLocation = (location) => {
	return {
		type: "SAVE_LOCATION",
		payload: location
	}
}