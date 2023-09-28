import { createSlice } from "@reduxjs/toolkit"
import {
	getAllCustomerDeposit,
	getAllDeposit,
	getIDDeposit,
	postCreateDeposit,
	postSearchDeposit,
	putDeleteDeposit,
} from "./depositThunk"

const initialState = {
	data: {
		getAllCustomerDeposit: [],
		postSearchAllPage: [],
		postSearchDeposit: [],
		getIDDeposit: [],
	},
	success: {
		getAllCustomerDeposit: false,
		postCreateDeposit: false,
		postSearchDeposit: false,
		putDeleteDeposit: false,
		getIDDeposit: false,
	},
	message: {
		getAllCustomerDeposit: "",
		postCreateDeposit: "",
		postSearchDeposit: "",
		putDeleteDeposit: "",
		getIDDeposit: "",
	},
}
const depositSlice = createSlice({
	name: "deposit",
	initialState,
	reducers: {
		resetPostSearchDeposit(state) {
			state.data.postSearchDeposit = []
			state.success.postSearchDeposit = false
			state.message.postSearchDeposit = ""
		},
	},
	extraReducers: (builder) => {
		// Lấy tất cả các phiếu
		builder.addCase(getAllDeposit.fulfilled, (state, action) => {
			console.log(`deposit/getAllDeposit: ${action.payload.message}`)
			state.data = action.payload.data
			state.message = action.payload.message
			state.success = action.payload.success
		})
		// Lấy thông tin của một phiếu
		builder.addCase(getIDDeposit.fulfilled, (state, action) => {
			console.log(`deposit/getIDDeposit:  ${action.payload.message}`)
			state.data.getIDDeposit = action.payload.data
			state.success.getIDDeposit = action.payload.success
			state.message.getIDDeposit = action.payload.message
		})
		// Lấy phiếu theo search
		builder.addCase(postSearchDeposit.fulfilled, (state, action) => {
			console.log(`deposit/postSearchDeposit: ${action.payload.message}`)
			state.data.postSearchDeposit = action.payload.data
			state.message.postSearchDeposit = action.payload.message
			state.success.postSearchDeposit = action.payload.success
		})
		// Lấy tất cả các phiểu của một người
		builder.addCase(getAllCustomerDeposit.fulfilled, (state, action) => {
			console.log(
				`deposit/getAllCustomerDeposit: ${action.payload.message}`
			)
			state.data.getAllCustomerDeposit = action.payload.data
			state.message.getAllCustomerDeposit = action.payload.message
			state.success.getAllCustomerDeposit = action.payload.success
		})
		// Tạo phiếu mới cho một người
		builder.addCase(postCreateDeposit.fulfilled, (state, action) => {
			console.log(`deposit/postCreateDeposit: ${action.payload.message}`)
			state.success.postCreateDeposit = action.payload.success
			state.message.postCreateDeposit = action.payload.message
		})
		// Xóa Một Phiếu
		builder.addCase(putDeleteDeposit.fulfilled, (state, action) => {
			console.log(`deposit/putDeleteDeposit: ${action.payload.message}`)
			state.success.putDeleteDeposit = action.payload.success
			state.message.putDeleteDeposit = action.payload.message
		})
	},
})
const depositReducer = depositSlice.reducer
export const { resetPostSearchDeposit } = depositSlice.actions
export default depositReducer
