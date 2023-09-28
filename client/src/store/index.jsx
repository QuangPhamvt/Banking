import { configureStore } from "@reduxjs/toolkit"
import depositReducer from "./deposit/depositSlice"
import userReducer from "./auth/userSlice"
import customerReducer from "./customer/customerSlice"
import reportReducer from "./report/reportSlice"

const store = configureStore({
	reducer: {
		deposit: depositReducer,
		auth: userReducer,
		customer: customerReducer,
		report: reportReducer,
	},
})

export default store
