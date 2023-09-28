import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosDeposit from "../../api/axiosDeposit"

//hiển thị một số phiếu theo page, limit
export const getAllDeposit = createAsyncThunk(
	"deposit/getAllDeposit",
	async function (data) {
		const { page, limit } = data
		try {
			return (
				page && limit && (await axiosDeposit.axiosGetAllDeposit(data))
			)
		} catch (error) {
			return error.message
		}
	}
)
// hiển thị thông tin của một phiếu
export const getIDDeposit = createAsyncThunk(
	"deposit/getIDDeposit",
	async function (data) {
		try {
			return await axiosDeposit.axiosGetIDDeposit(data)
		} catch (error) {
			return error.response.data
		}
	}
)
//hiển thị tất cả các phiếu của khách hàng
export const getAllCustomerDeposit = createAsyncThunk(
	"deposit/getAllCustomerDeposit",
	async function (CMND) {
		try {
			return CMND && (await axiosDeposit.axiosGetAllCustomerDeposit(CMND))
		} catch (error) {
			console.log(error.response.data)
			return error.response.data
		}
	}
)
//Lấy theo search phiếu
export const postSearchDeposit = createAsyncThunk(
	"deposit/postSearchDeposit",
	async function (data) {
		try {
			return await axiosDeposit.axiosPostSearchDeposit(data)
		} catch (error) {
			console.log(error.response.data)
			return error.response.data
		}
	}
)
// TẠo một phiếu gửi tiền mới
export const postCreateDeposit = createAsyncThunk(
	"deposit/postCreateDeposit",
	async function (data) {
		try {
			return await axiosDeposit.axiosPostCreateDeposit(data)
		} catch (error) {
			console.log(error.response.data)
			return error.response.data
		}
	}
)
//Update lại số tiền
export const getUpdateDeposit = createAsyncThunk(
	"deposit/getUpdateDepost",
	async function () {
		try {
			await axiosDeposit.axiosGetUpdateDeposit()
		} catch (error) {
			console.log(error.message)
		}
	}
)
// Xoa deposit
export const putDeleteDeposit = createAsyncThunk(
	"deposit/putDeleteDeposit",
	async function (id) {
		try {
			return await axiosDeposit.axiosPutDeleteDeposit(id)
		} catch (error) {
			console.log(error.message)
		}
	}
)
