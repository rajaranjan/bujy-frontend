import * as types from '../config/actionTypes';
import {push} from 'react-router-redux';
import axios from 'axios';
import {API_URL, User} from '../config';

//load poll list actions
export function LoadPollsRequest(values) {
	return (dispatch) => {
		let token = User.getAccessToken();
		return axios.get(API_URL + '/poll/list', {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
			.then((polls) => {
				console.log(polls.data.data);
				var pollData = {}
				pollData.polls = polls.data.data;
				pollData.showModal = false;
				dispatch(LoadPollsSuccess(pollData))
			})
			.catch((error) => {
				dispatch(LoadPollsFailure(error));
			})
	}
}	
export function LoadPollsFailure(error) {
	return {
		type: types.LOAD_POLLS_FAILURE,
		payload: error
	};
}
export function LoadPollsSuccess(value) {
	return {
		type:  types.LOAD_POLLS_SUCCESS,
		payload: value
	};
}

//create poll action 
export function CreatePollRequest(values) {
	console.log("ok",values);
	return (dispatch) => {
		dispatch(push('/login'));
	}
}
export function CreatePollFailure(error) {
	return {
		type: types.CREATE_POLL_FAILURE,
		payload: error
	};
}
export function CreatePollSuccess(value) {
	return {
		type:  types.CREATE_POLL_SUCCESS,
		payload: value
	};
}

//load poll selected 
export function LoadPoll(id, pollData) {
	return (dispatch) => {
		let token = User.getAccessToken();
		return axios.get(API_URL + '/poll/'+id, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
			.then((poll) => {
				console.log(poll.data.data);
				console.log("pollData",pollData);
				pollData.selectedPoll = poll.data.data;
				pollData.showModal = true;
				dispatch(LoadPollSuccess(pollData));
			})
			.catch((error) => {
				dispatch(LoadPollFailure(error));
			})
	}
}
export function LoadPollSuccess(value) {
	
	return {
		type:  types.LOAD_POLL_SUCCESS,
		payload: value
	};
}
export function LoadPollFailure(error) {
	return {
		type: types.LOAD_POLL_FAILURE,
		payload: error
	};
}
// remove poll 
export function RemovePollRequest(values) {
	console.log("ok",values);
	return (dispatch) => {
		dispatch(push('/login'));
	}
}
export function RemovePollFailure(error) {
	return {
		type: types.REMOVE_POLL_FAILURE,
		payload: error
	};
}
export function RemovePollSuccess(value) {
	return {
		type:  types.REMOVE_POLL_SUCCESS,
		payload: value
	};
}