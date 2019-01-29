import * as types from '../config/actionTypes';
import initialState from './initialState';

export default function pollReducer(state = initialState, action) {
    switch(action.type) {
        //add polls to UI
        case types.ADD_POLL_UI_SUCCESS:
            let x = state.pollData;
            x.poll = action.payload
            return Object.assign({}, state, {
                pollData: x,
                loaded: true,
				error: false
            })
        //load single poll
        case types.LOAD_POLL_SUCCESS:
            return Object.assign({}, state, {
                pollData: action.payload,
				loaded: true,
				error: false
			});

        case types.LOAD_POLL_FAILURE:
            return Object.assign({}, state, {
				loaded: false,
				error: true
            });
        
        //load all polls
        case types.LOAD_POLLS_REQUEST:
            return Object.assign({}, state, {
				loaded: false,
				error: false
			});
        case types.LOAD_POLLS_SUCCESS:
            return Object.assign({}, state, {
                pollData: action.payload,
				loaded: true,
				error: false
			});

        case types.LOAD_POLLS_FAILURE:
            return Object.assign({}, state, {
				loaded: false,
				error: true
            });
            
        //create poll request
        case types.CREATE_POLL_REQUEST:
            return Object.assign({}, state, {
                payload: action.payload,
				success: false,
				error: false
			});
            //return state
        case types.CREATE_POLL_SUCCESS:
            return Object.assign({}, state, {
                pollData: action.payload,
				success: true,
				error: false
			});

        case types.CREATE_POLL_FAILURE:
            // let payload = action.payload;
            // payload.succss = false;
            // payload.error = true;
            return Object.assign({}, state, {
                //pollData: payload,
                success : false,
                error : true
            });
        
        case types.REMOVE_POLL_SUCCESS: 
            return Object.assign({}, state, {
                pollData: action.payload,
                deleted : true
            });
        case types.REMOVE_POLL_FAILURE: 
            return Object.assign({}, state, {
                pollData: action.payload,
                deleted : false,
                error: true
            });
        //close modal 
        case types.CLOSE_MODAL_SUCCESS:
            state.pollData.showModal = false
            return Object.assign({}, state, {
                pollData: state.pollData,
            });

        //submit vote 
        case types.SUBMIT_VOTE_SUCCESS: 
            return Object.assign({}, state, {
                pollData: state.pollData,
            });
            
        default:   
            return state;
    }
}