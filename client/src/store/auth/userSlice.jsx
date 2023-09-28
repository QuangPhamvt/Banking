import { createSlice } from "@reduxjs/toolkit"
import {
	getLogoutUser,
	getVerifyUser,
	postCreateUser,
	postLoginUser,
} from "./userThunk"

const initialState = {
	success: {
		verify: "",
		postCreateUser: "not exist",
	},
	auth: "",
	message: {
		postLoginUser: "",
		getVerifyUser: "",
		getLogoutUser: "",
		postCreateUser: undefined,
	},
}
const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(postLoginUser.fulfilled, (state, action) => {
			state.auth = action.payload.auth
			state.success.verify = action.payload.success
			state.message.postLoginUser = action.payload.message
		})
		builder.addCase(getVerifyUser.fulfilled, (state, action) => {
			state.auth = action.payload.auth
			state.success.verify = action.payload.success
			state.message.getVerifyUser = action.payload.message
		})
		builder.addCase(getLogoutUser.fulfilled, (state, action) => {
			state.auth = action.payload.auth
			state.success.verify = action.payload.success
			state.message.getLogoutUser = action.payload.message
		})
		builder.addCase(postCreateUser.fulfilled, (state, action) => {
			state.success.postCreateUser = action.payload.success
			state.message.postCreateUser = action.payload.message
		})
	},
})

const userReducer = userSlice.reducer

export default userReducer
