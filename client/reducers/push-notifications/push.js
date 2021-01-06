import { PUSH_NOTIFICATION } from "../../actions/types.js";

const initialState = {
    redirect: {
        redirect: false,
        route: ""
    }
}

export default (state = initialState, action) => {
	switch (action.type) {
		case PUSH_NOTIFICATION: 
			return {
                ...state,
                redirect: action.payload
			}
		default: 
			return state;
	}
}