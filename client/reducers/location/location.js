import { LOCATION_GATHER, SAVE_LOCATION } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case LOCATION_GATHER: 
			return {
				...state,
				location_initial: action.payload
			}
		case SAVE_LOCATION: 
			return {
				...state,
				current_location_user: action.payload
			}
		default: 
			return state;
	}
}