import { LOCATION_GATHER } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case LOCATION_GATHER: 
			return {
				...state,
				location_initial: action.payload
			}
		default: 
			return state;
	}
}