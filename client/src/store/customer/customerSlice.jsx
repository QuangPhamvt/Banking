import { createSlice } from "@reduxjs/toolkit"
import { createCustomer, getCustomer } from "./customerThunk"

const initialState = {
	data: [],
	success: {
		getCustomer: false,
		createCustomer: false,
	},
	message: {
		getCustomer: "",
		createCustomer: "",
	},
}

const customerSlice = createSlice({
	name: "customer",
	initialState,
	reducers: {},
	extraReducers: (build) => {
		build.addCase(getCustomer.fulfilled, (state, action) => {
			state.data = action.payload.data
			state.success.getCustomer = action.payload.success
			state.message.getCustomer = action.payload.message
		})
		build.addCase(createCustomer.fulfilled, (state, action) => {
			state.success.createCustomer = action.payload.success
			state.message.createCustomer = action.payload.message
		})
	},
})

const customerReducer = customerSlice.reducer
export default customerReducer
