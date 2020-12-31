import { 
    LOGIN_SUCCESS, 
    LOGIN_FAIL 
} from '../../actions/types.js';

const INITIAL_STATE = {
    error: '',
    user: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: 
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_FAIL:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        default: 
            return state;
    }
};