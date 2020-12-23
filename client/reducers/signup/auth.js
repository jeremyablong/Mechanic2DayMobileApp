import { AUTH, FINISHED } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case AUTH: 
			return {
				...state,
				authenticated: action.payload
			}
		case FINISHED: 
			return {
				...state,
				finished: action.payload
			}
		default: 
			return state;
	}
}