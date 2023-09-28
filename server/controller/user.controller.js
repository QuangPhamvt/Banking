import { mysql } from "../models/index.js"
import jwt from "jsonwebtoken"
import { createUserModel, findUserModel } from "../models/user.model.js"

//get token
export async function getToken(req, res, next) {
	try {
		return res.status(200).json({
			success: true,
			auth: req.body.user.auth,
			message: "nice!",
		})
	} catch (error) {
		console.log(error.message)
	}
}

//TẠO NGƯỜI SỬ DỤNG
export async function createUser(req, res, next) {
	const { username, password, TenNhom } = req.body
	try {
		const [isExists] = await findUserModel(username)
		if (isExists === [] || !password)
			return res.status(400).json({
				success: false,
				message: "Đã tồn tại nhân vật này",
			})
		await createUserModel({ username, password, TenNhom })
		return res.status(200).json({
			success: true,
			message: "Tao thanh cong",
		})
	} catch (error) {
		next(error)
	}
}

//Đăng nhập vào hệ thống
export async function loginUser(req, res, next) {
	const { username, password } = req.body
	try {
		const [[data]] = await findUserModel(username)
		if (!data || password != data.password)
			return res.status(401).json({
				success: false,
				auth: "",
				message: "Đăng nhập sai thông tin",
			})
		const token = jwt.sign({ username, auth: data.TenNhom }, "CNPM")
		res.cookie("authToken", token, {
			maxAge: 360 * 24 * 60 * 60 * 100,
			httpOnly: true,
		})
		return res.status(200).json({
			success: true,
			auth: data.TenNhom,
			message: "Đăng nhập thành công ",
		})
	} catch (error) {
		next(error)
	}
}

export async function logoutUser(req, res, next) {
	res.clearCookie("authToken").status(200).json({
		success: false,
		auth: "",
		message: "not having token",
	})
}
