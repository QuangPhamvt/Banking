import axiosClient from "./axiosClient"

const axiosDeposit = {
	//Lấy search
	axiosPostSearchDeposit: (data) =>
		axiosClient.post(`deposit/search/${data.page}`, data),
	// Lấy dữ liệu phiếu
	axiosGetIDDeposit: (id) => axiosClient.get(`deposit/id/${id}`),
	//Lấy tất cả danh sách
	axiosGetAllDeposit: ({ page, limit }) =>
		axiosClient.get("deposit", { params: { page, limit } }),
	//Lấy tất cả của 1 người
	axiosGetAllCustomerDeposit: (CMND) => axiosClient.get(`deposit/${CMND}`),
	//Tạo phiếu của 1 người
	axiosPostCreateDeposit: ({ CMND, TienGoc, LTK }) =>
		axiosClient.post("deposit/create", { CMND, TienGoc, LTK }),
	//update lại dữ liệu
	axiosGetUpdateDeposit: () => axiosClient.get("deposit/update"),
	//delele phieu cua nguoi su dung
	axiosPutDeleteDeposit: (id) => axiosClient.put(`deposit/drawout/${id}`),
}

export default axiosDeposit
