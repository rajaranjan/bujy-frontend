import * as types from '../config/actionTypes';
import initialState from './initialState';

export default function pollReducer(state = initialState, action) {
    switch(action.type) {
        //load single poll
        case types.LOAD_POLL_SUCCESS:
            return Object.assign({}, state.pollData, {
                pollData: action.payload,
				loaded: true,
				error: null
			});

        case types.LOAD_POLL_FAILURE:
            return Object.assign({}, state.pollData, {
				loaded: false,
				error: true
            });
        
        //load all polls
        case types.LOAD_POLLS_REQUEST:
            return Object.assign({}, state.pollData, {
				loaded: false,
				error: null
			});
        case types.LOAD_POLLS_SUCCESS:
            return Object.assign({}, state.pollData, {
                pollData: action.payload,
				loaded: true,
				error: null
			});

        case types.LOAD_POLLS_FAILURE:
            return Object.assign({}, state.pollData, {
				loaded: false,
				error: true
            });
            
        case types.CREATE_POLL_REQUEST:
            return Object.assign({}, state, {
				loading: true,
				error: null
			});
            //return state
        case types.CREATE_POLL_SUCCESS:
            return Object.assign({}, state, {
                profile: action.payload,
				loading: false,
				error: null
			});

        case types.CREATE_POLL_FAILURE:
            // return Object.assign(
            //     {},
            //     state,
            //     {profile: ""}
            // );
            // return Object.assign({}, state, {
            //     profile: {
            //     }
            //   });
            return Object.assign({}, state, {
               // profile: action.payload,
				loading: false,
				error: true
			});
        default:   
            return state;
    }
}