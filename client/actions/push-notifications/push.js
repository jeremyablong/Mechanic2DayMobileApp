import { PUSH_NOTIFICATION } from "../types.js";

export const checkToNavigatePushNotification = (item) => {
	return {
		type: "PUSH_NOTIFICATION",
		payload: item
	}
}