import { combineReducers } from "redux";
import auth from "./signup/auth.js";
import location from "./location/location.js";
import accountType from "./accountType/type.js";
import diagnostics from "./diagnostics/index.js";

export default combineReducers({
	auth,
	location,
	accountType,
	diagnostics
});