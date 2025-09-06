import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AUTH_TOKEN } from 'constants/AuthConstant';
import FirebaseService from 'services/FirebaseService';

export const initialState = {
	loading: false,
	message: '',
	showMessage: false,
	redirect: '',
	token: localStorage.getItem(AUTH_TOKEN) || null
}

export const signIn = createAsyncThunk('auth/signIn',async (data, { rejectWithValue }) => {
	const { email, password } = data
	try {
		const response = await FirebaseService.signInEmailRequest(email, password)
		if (response.user) {
			const token = response.user.refreshToken;
			localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
			return token;
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})

export const signUp = createAsyncThunk('auth/signUp',async (data, { rejectWithValue }) => {
	const { email, password } = data
	try {
		const response = await FirebaseService.signUpEmailRequest(email, password)
		if (response.user) {
			const token = response.user.refreshToken;
			localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
			return token;
		} else {
			return rejectWithValue(response.message?.replace('Firebase: ', ''));
		}
	} catch (err) {
		return rejectWithValue(err.message || 'Error')
	}
})

export const signOut = createAsyncThunk('auth/signOut',async () => {
    const response = await FirebaseService.signOutRequest()
	localStorage.removeItem(AUTH_TOKEN);
    return response.data
})

export const signInWithGoogle = createAsyncThunk('auth/signInWithGoogle', async (_, { rejectWithValue }) => {
    const response = await FirebaseService.signInGoogleRequest()
	if (response.user) {
		const token = response.user.refreshToken;
		localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
		return token;
	} else {
		return rejectWithValue(response.message?.replace('Firebase: ', ''));
	}
})

export const signInWithFacebook = createAsyncThunk('auth/signInWithFacebook', async (_, { rejectWithValue }) => {
    const response = await FirebaseService.signInFacebookRequest()
	if (response.user) {
		const token = response.user.refreshToken;
		localStorage.setItem(AUTH_TOKEN, response.user.refreshToken);
		return token;
	} else {
		return rejectWithValue(response.message?.replace('Firebase: ', ''));
	}
})


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticated: (state, action) => {
			state.loading = false
			state.redirect = '/'
			state.token = action.payload
		},
		showAuthMessage: (state, action) => {
			state.message = action.payload
			state.showMessage = true
			state.loading = false
		},
		hideAuthMessage: (state) => {
			state.message = ''
			state.showMessage = false
		},
		signOutSuccess: (state) => {
			state.loading = false
			state.token = null
			state.redirect = '/'
		},
		showLoading: (state) => {
			state.loading = true
		},
		signInSuccess: (state, action) => {
			state.loading = false
			state.token = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signIn.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signOut.fulfilled, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signOut.rejected, (state) => {
				state.loading = false
				state.token = null
				state.redirect = '/'
			})
			.addCase(signUp.pending, (state) => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signUp.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithGoogle.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithGoogle.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithGoogle.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
			.addCase(signInWithFacebook.pending, (state) => {
				state.loading = true
			})
			.addCase(signInWithFacebook.fulfilled, (state, action) => {
				state.loading = false
				state.redirect = '/'
				state.token = action.payload
			})
			.addCase(signInWithFacebook.rejected, (state, action) => {
				state.message = action.payload
				state.showMessage = true
				state.loading = false
			})
	},
})

export const { 
	authenticated,
	showAuthMessage,
	hideAuthMessage,
	signOutSuccess,
	showLoading,
	signInSuccess
} = authSlice.actions

export default authSlice.reducer