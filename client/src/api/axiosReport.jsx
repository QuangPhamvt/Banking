import axiosClient from "./axiosClient"

const axiosReport = {
	axiosGetAllReport: () => axiosClient.get("/report"),
	axiosGetReport: (data) => axiosClient.post(`/report/${data.page}`, data),
}
export default axiosReport
