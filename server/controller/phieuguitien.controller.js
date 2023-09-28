import { mysql } from "../models/index.js"
import {
	createDeposit,
	findDepositCustomerModel,
	findDepositSearchModel,
	findDepositModel,
	updateDrawOut,
	updateDepositModel,
	findDepositSearchPageModel,
} from "../models/phieuguitien.model.js"

// lấy tất cả phiếu tồn tại
export async function findDepositController(req, res) {
	const { page, limit } = req.query
	try {
		let data = []
		if (!page || !limit) {
			data = await findDepostModel(0, 5)
		} else data = await findDepostModel(page, limit)
		return res.status(200).json({
			success: true,
			data: data[0],
			message: "phieu gui tien",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
}
// tìm phiêu theo id
export async function findDepositIDController(req, res, next) {
	const { id } = req.params
	try {
		const [data] = await mysql.query(
			`SELECT  
				PGT.id, KH.CMND, KH.HoTenKhachHang, LTK.TenLoaiTietKiem, PGT.TienDu
			FROM PHIEUGUITIEN PGT
			INNER JOIN KHACHHANG KH on PGT.MaKhachHang = KH.id
			INNER JOIN LOAITIETKIEM LTK on LTK.id= PGT.LTK
			WHERE PGT.id = ?
			`,
			[id]
		)
		return res.status(200).json({
			success: true,
			data,
			message: "nice!",
		})
	} catch (error) {
		next(error)
	}
}
// tìm tất cả phiếu của một người
export async function findDepositCustomerController(req, res, next) {
	const { CMND } = req.params
	try {
		const [data] = await findDepositCustomerModel(CMND)
		console.log(data[0])
		if (!data[0])
			return res.status(400).json({
				success: false,
				message: "Không tồn tại bất cứ phiếu nào",
			})
		const total = data.reduce(
			(total, currentValue) => total + parseInt(currentValue["TienDu"]),
			0
		)
		return res.status(200).json({
			success: true,
			data,
			SoTienGui: total,
			SoLuong: data.length,
			message: "oke oke",
		})
	} catch (error) {
		next(error)
	}
}
// Tìm phiếu theo search
export async function findDepositSearchController(req, res, next) {
	const { page } = req.params
	let limit = 5
	try {
		let data
		if (page) {
			;[data] = await findDepositSearchPageModel({ ...req.body, page })
		}
		let [maxPage] = await findDepositSearchModel(req.body)

		maxPage = Math.ceil(maxPage[0].page / limit)
		data = { data: data, page: parseInt(page), maxPage }
		return res.status(200).json({
			success: true,
			data,
			message: "Search oke",
		})
	} catch (error) {
		next(error)
	}
}
// tạo phiếu
export async function createDepositController(req, res, next) {
	try {
		const [data] = await createDeposit(req.body)
		if (!data)
			return res.json({
				success: false,
				message: "Nhập thiếu thông tin hoặc sai thông tin khách hành",
			})
		return res.status(200).json({
			success: true,
			data,
			message: "oke oke",
		})
	} catch (error) {
		next(error)
	}
}
// cập nhập lại tiền cho 1 người
export async function updateDepositController(req, res, next) {
	try {
		await updateDepositModel()
		return res.status(200).json({
			success: true,
			message: "đã cập nhạp thành công",
		})
	} catch (error) {
		next(error)
	}
}

// Rút tiền
export async function deleteDepositController(req, res, next) {
	const { id } = req.params
	try {
		await updateDrawOut(id)
		return res.json({
			success: true,
			message: "oke",
		})
	} catch (error) {
		next(error)
	}
}
