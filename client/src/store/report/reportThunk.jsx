import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosReport from "../../api/axiosReport"

export const getAllReport = createAsyncThunk(
	"report/getAllReport",
	async function () {
		try {
			return await axiosReport.axiosGetAllReport()
		} catch (error) {
			console.log(error.respone.data)
			return error.respone.data
		}
	}
)

export const getReport = createAsyncThunk(
	"report/getReport",
	async function (data) {
		try {
			console.log(data)
			return await axiosReport.axiosGetReport(data)
		} catch (error) {
			console.log(error.respone.data)
			return error.respone.data
		}
	}
)
