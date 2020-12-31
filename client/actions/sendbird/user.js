import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL
} from '../types.js';
import { sbConnect } from './connect.js';

export const sendbirdLogin = ({ userId, nickname }) => {
    return (dispatch) => {
        sbConnect(userId, nickname)
        .then((user) => {
            dispatch({
                type: LOGIN_SUCCESS, 
                payload: user 
            })
        })
        .catch((error) => {
            dispatch({ 
                type: LOGIN_FAIL,
                payload: error
            })
        });
    }
}