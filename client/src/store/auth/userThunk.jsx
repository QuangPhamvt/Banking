import { createAsyncThunk } from "@reduxjs/toolkit"
import axiosUser from "../../api/axiosUser"
const { axiosPostLogin, axiosGetVerify, axiosGetLogout, axiosPostCreateUser } =
	axiosUser
export const postLoginUser = createAsyncThunk(
	"auth/postLoginUser",
	async function (data) {
		try {
			return await axiosPostLogin(data)
		} catch (error) {
			console.log(error.response.data)
			return error.response.data
		}
	}
)

export const getVerifyUser = createAsyncThunk(
	"auth/getVerityUser",
	async function () {
		try {
			return await axiosGetVerify()
		} catch (error) {
			console.log(error.response)
		}
	}
)

export const getLogoutUser = createAsyncThunk(
	"auth/getLogoutUser",
	async function () {
		try {
			return await axiosGetLogout()
		} catch (error) {
			console.log(error.response)
		}
	}
)

export const postCreateUser = createAsyncThunk(
	"auth/postCreateUser",
	async function (data) {
		try {
			return await axiosPostCreateUser(data)
		} catch (error) {
			console.log(error.response)
			return error.response.data
		}
	}
)
