import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosCustomer from "../../api/axiosCustomer"

export const getCustomer = createAsyncThunk(
	"customer/getCustomer",
	async function (id) {
		try {
			return await axiosCustomer.axiosGetCustomer(id)
		} catch (error) {
			console.log(error.response.data)
			return error.response.data
		}
	}
)

export const createCustomer = createAsyncThunk(
	"customer/createCustomer",
	async function (data) {
		try {
			return await axiosCustomer.axiosCreateCustomer(data)
		} catch (error) {
			console.log(error.response.data)
			return error.response.data
		}
	}
)
