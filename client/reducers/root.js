import { combineReducers } from "redux";
import auth from "./signup/auth.js";
import location from "./location/location.js";

export default combineReducers({
	auth,
	location
});