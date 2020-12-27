import { ACCOUNT_TYPE } from "../../actions/types.js";


export default (state = {}, action) => {
	switch (action.type) {
		case ACCOUNT_TYPE: 
			return {
				...state,
				type: action.payload
			}
		default: 
			return state;
	}
}