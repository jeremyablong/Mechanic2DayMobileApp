import { AUTH, FINISHED } from "../types.js";

export const authenticated = (item) => {
	return {
		type: "AUTH",
		payload: item
	}
}
export const finishedSignup = (item) => {
	return {
		type: "FINISHED",
		payload: item
	}
}
