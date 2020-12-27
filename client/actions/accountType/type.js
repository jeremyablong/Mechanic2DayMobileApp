import { ACCOUNT_TYPE } from "../types.js";

export const switchAccountType = (item) => {
	return {
		type: "ACCOUNT_TYPE",
		payload: item
	}
}