import { createSlice } from "@reduxjs/toolkit"
import { getAllReport, getReport } from "./reportThunk"

const initialState = {
	success: {
		getAllReport: false,
		getReport: false,
	},
	data: {
		getAllReport: [],
		getReport: [],
	},
	message: {
		getAllReport: "",
		getReport: "",
	},
}

const reportSlice = createSlice({
	name: "report",
	initialState,
	reducers: {
		resetGetReport(state) {
			console.log(state)
			state.success.getReport = false
			state.data.getReport = []
			state.message.getReport = ""
		},
	},
	extraReducers: (build) => {
		build.addCase(getAllReport.fulfilled, (state, action) => {
			state.data.getAllReport = action.payload.data
			state.success.getAllReport = action.payload.success
			state.message.getAllReport = action.payload.message
		})
		build.addCase(getReport.fulfilled, (state, action) => {
			console.log(action)
			state.data.getReport = action.payload.data
			state.success.getReport = action.payload.success
			state.message.getReport = action.payload.message
		})
	},
})

const reportReducer = reportSlice.reducer
export const { resetGetReport } = reportSlice.actions
export default reportReducer
