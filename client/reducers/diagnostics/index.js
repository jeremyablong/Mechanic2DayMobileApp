import { DIAGNOSTICS } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case DIAGNOSTICS: 
			return {
				...state,
				info: action.payload
			}
		default: 
			return state;
	}
}