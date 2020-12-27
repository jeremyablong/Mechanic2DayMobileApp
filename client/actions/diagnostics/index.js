import { DIAGNOSTICS } from "../types.js";

export const diagnostics = (item) => {
	return {
		type: "DIAGNOSTICS",
		payload: item
	}
}