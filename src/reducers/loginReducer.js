import * as types from '../config/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.user, action) {
    switch(action.type) {
        // case types.LOGIN_REQUEST:
        //     return Object.assign({}, state, {
		// 		loading: true,
		// 		error: null
		// 	});
            //return state
        case types.LOGIN_REQUEST_SUCCESS:
            return Object.assign({}, state, {
                user: action.payload.data.data,
                requesting: true,
                success: true,
				error: null
			});

        case types.LOGIN_REQUEST_FAILURE:
            // return Object.assign(
            //     {},
            //     state,
            //     {profile: ""}
            // );
            // return Object.assign({}, state, {
            //     profile: {
            //     }
            //   });
            console.log("action",action);
            console.log("state",state);
            return Object.assign({}, state, {
               // profile: action.payload,
                requesting: false,
                error: true,
                msg: action.payload
			});
        default:   
            return state;
    }
}