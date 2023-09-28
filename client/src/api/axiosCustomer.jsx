import axiosClient from "./axiosClient"

const axiosCustomer = {
	axiosGetCustomer: (id) => axiosClient.get(`customer/${id}`),
	axiosCreateCustomer: (data) => axiosClient.post("customer/create", data),
}

export default axiosCustomer
