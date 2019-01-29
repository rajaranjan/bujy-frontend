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
				let poll = {
						"title": "",
						"options": [],
						"option": ""
				}
				pollData.poll = poll;
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

//add poles 
export function AddPollsToUi(poll) {
	return (dispatch) => {
		dispatch(AddPollsToUiSuccess(poll))
	}
}
export function AddPollsToUiSuccess(value) {
	return {
		type:  types.ADD_POLL_UI_SUCCESS,
		payload: value
	};
}

export function AddPollsToUiFailure(value) {
	return {
		type:  types.ADD_POLL_UI_FAILURE,
		payload: value
	};
}

//create poll action 
export function CreatePollRequest(values) {
	let data = {};
	data.options = values.options;
	data.title = values.title;
	return (dispatch) => {
		let token = User.getAccessToken();
		axios.post(API_URL + '/poll', data, {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
				'Authorization': token
			}
		})
		.then((polls) => {
			console.log(polls.data.data);
			var pollData = {}
			pollData.polls = polls.data.data;
			pollData.showModal = false;
			let poll = {
				"title": "",
				"options": [],
				"option": ""
			};
			pollData.poll = poll;
			dispatch(CreatePollSuccess(pollData))
		})
		.catch((error) => {
			dispatch(CreatePollFailure(error));
		})
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
					pollData.selectedPoll = poll.data.data;
					let voteList = []
					let votes = pollData.selectedPoll.votes;
					let i = 0;
					let count = 0;
					votes.map((vote,index) => {
						count = count + vote.number;
					})
					votes.map((vote, index) => {
						let option = vote.option;
						let number = Math.floor((vote.number/count) * 100);
						let arr = [];
						arr.push(option);
						arr.push(number);
						voteList.push(arr);
					})
				pollData.selectedPoll.votes = voteList;
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
export function RemovePollRequest(id,poll) {
	console.log("ok",poll);
	let pollData;
	return (dispatch) => {
		let token = User.getAccessToken();
		return axios.delete(API_URL + '/poll/'+id, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
			.then((polls) => {
					console.log("remove",polls);
					pollData.polls = polls.data.data;
					pollData.showModal = false;
					let pollSingle = {
						"title": "",
						"options": [],
						"option": ""
					};
					pollData.poll = pollSingle;	
					console.log("remove",pollData);
					dispatch(RemovePollSuccess(pollData));
			})
			.catch((error) => {
				dispatch(RemovePollFailure(error));
			})
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

//close modal 
export function CloseModal() {
	// data.showModal = false;
	return (dispatch) => {
		dispatch(CloseModalSuccess());
	}
}
export function CloseModalSuccess(value) {
		return {
			type:  types.CLOSE_MODAL_SUCCESS,
			payload: value
		};
}

//submit poll 
export function SubmitVote(option, data) {
	console.log("submit",data);
	return (dispatch) => {
		let token = User.getAccessToken();
		return axios.post(API_URL + '/poll/vote',{
				"option": option,
				"pollId": data.selectedPoll._id
			}, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': token
				}
			})
			.then((recvdata) => {
				if (recvdata.status == 200) {
					return axios.get(API_URL + '/poll/' + data.selectedPoll._id, {
						headers: {
							'Content-Type': 'application/json',
							'Authorization': token
						}
					})
				}
			})
			.then((selectedPoll) => {
						data.selectedPoll = selectedPoll.data.data;
						let voteList = []
						let votes = data.selectedPoll.votes;
						let i = 0;
						let count = 0;
						votes.map((vote,index) => {
							count = count + vote.number;
						})
						votes.map((vote, index) => {
							let option = vote.option;
							let number = Math.floor((vote.number/count) * 100);
							let arr = [];
							arr.push(option);
							arr.push(number);
							voteList.push(arr);
						})
					data.selectedPoll.votes = voteList;
					data.showModal = true;
					dispatch(SubmitVoteSuccess(data));
			})
			.catch((error) => {
				dispatch(SubmitVoteFailure(error));
			})
		}
}

export function SubmitVoteSuccess(value) {
		return {
			type:  types.SUBMIT_VOTE_SUCCESS,
			payload: value
		};
}
export function SubmitVoteFailure(value) {
	return {
		type:  types.SUBMIT_VOTE_SUCCESS,
		payload: value
	};
}