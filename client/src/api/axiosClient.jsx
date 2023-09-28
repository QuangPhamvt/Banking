import axios from "axios"
import queryString from "query-string"

const axiosClient = axios.create({
	baseURL: "http://localhost:5000/api/v1/",
	timeout: 3000,
	headers: {
		"Access-Control-Allow-Origin": "http://localhost:5000",
		"Content-Type": "application/json",
	},
	withCredentials: true,
	paramsSerializer: (params) => queryString.stringify(params),
})
// middleware trước khi gửi đi
axiosClient.interceptors.request.use(async function (config) {
	try {
		config["withCredentials"] = true
		return config
	} catch (error) {
		return error
	}
})

//middleware trước khi nhân
axiosClient.interceptors.response.use(async function (response) {
	try {
		if (response && response.data) return response.data
		return response
	} catch (error) {
		console.log(error.response)
		return error.response
	}
})

export default axiosClient
