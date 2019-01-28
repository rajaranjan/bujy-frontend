import * as types from '../config/actionTypes';
import {push} from 'react-router-redux';
import { API_URL,User } from '../config'
import axios from 'axios';

export function LoginRequest(values) {
	console.log("values",values);
	
	return (dispatch) => {
		axios.post( API_URL + '/user/login', {
			email: values.email,
			password: values.password
	  	})
    	.then((response) => {
			console.log(response.data.data);
			let name = response.data.data.name;
			let email = response.data.data.email;
			let token = response.data.data.token;
		
			User.clear();
			User.setAccessToken(token);
			User.setName(name);
			User.setEmail(email);
			//dispatch(push('/dashboard'));
			dispatch(LoginRequestSuccess(response));
		})
		.catch((error) => {
			dispatch(LoginRequestFailure(error));
		})
	}
	
}
export function LoginRequestFailure(error) {
	return {
		type: types.LOGIN_REQUEST_FAILURE,
		payload: error
	};
}
export function LoginRequestSuccess(value) {
	return {
		type:  types.LOGIN_REQUEST_SUCCESS,
		payload: value
	};
}