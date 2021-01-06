import { combineReducers } from "redux";
import auth from "./signup/auth.js";
import location from "./location/location.js";
import accountType from "./accountType/type.js";
import diagnostics from "./diagnostics/index.js";
import sendbird_login from "./sendbird/login.js";
import redirect_push from "./push-notifications/push.js";

export default combineReducers({
	auth,
	location,
	accountType,
	diagnostics,
	sendbird_login,
	redirect_push
});