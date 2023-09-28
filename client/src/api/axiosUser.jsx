import axiosClient from "./axiosClient"

const axiosUser = {
	axiosPostLogin: (data) =>
		axiosClient.post("/user/login", {
			username: data.username,
			password: data.password,
		}),
	axiosGetVerify: () => axiosClient.get("/user"),
	axiosGetLogout: () => axiosClient.get("/user/logout"),
	axiosPostCreateUser: (data) => axiosClient.post("/user/create", data),
}

export default axiosUser
