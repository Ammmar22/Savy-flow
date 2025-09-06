import fetch from 'auth/FetchInterceptor'

const AuthService = {}

AuthService.login = function (data) {
	return fetch({
		url: '/auth/login',
		method: 'post',
		data: data
	})
}

AuthService.register = function (data) {
	return fetch({
		url: '/auth/register',
		method: 'post',
		data: data
	})
}

export default AuthService;