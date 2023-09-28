import {
	createCustomer,
	findCustomer,
	findOneCustomer,
} from "../models/khachhang.model.js"

export async function createCustomerController(req, res, next) {
	const data = req.body
	try {
		await createCustomer(data)
		return res.status(200).json({
			success: true,
			message: "Tao Thanh Cong Tai Khoan",
		})
	} catch (error) {
		next(error)
	}
}

export async function findCustomerController(req, res, next) {
	const { id } = req.params
	try {
		const [data] = await findOneCustomer(id)
		res.json({
			success: true,
			data,
		})
	} catch (error) {
		next(error)
	}
}
