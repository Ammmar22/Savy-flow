import axios from 'axios';
import { API_BASE_URL } from 'configs/AppConfig';
import { signOutSuccess } from 'store/slices/authSlice';
import store from '../store';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import { notification } from 'antd';

const unauthorizedCode = [400, 401, 403]

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

// Config
const TOKEN_PAYLOAD_KEY = 'authorization'

// API Request interceptor
service.interceptors.request.use(config => {
	const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;
	
	if (jwtToken) {
		config.headers[TOKEN_PAYLOAD_KEY] = jwtToken
	}

  	return config
}, error => {
	// Do something with request error here
	notification.error({
		message: 'Error'
	})
	Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response) => {
	return response.data
}, (error) => {

	let notificationParam = {
		message: ''
	}
 
	// Remove token and redirect 
	if (unauthorizedCode.includes(error.response.status)) {
		notificationParam.message = 'Authentication Fail'
		notificationParam.description = 'Please login again'
		localStorage.removeItem(AUTH_TOKEN)
		store.dispatch(signOutSuccess())
	}

	if (error.response.status === 404) {
		notificationParam.message = 'Not Found'
	}

	if (error.response.status === 500) {
		notificationParam.message = 'Internal Server Error'
	}
	
	if (error.response.status === 508) {
		notificationParam.message = 'Time Out'
	}

	notification.error(notificationParam)

	return Promise.reject(error);
});

export default service