import { Router } from "express"
import { customAlphabet } from "nanoid"
import { mysql } from "../models/index.js"
import {
	createCustomer,
	findCustomer,
	findOneCustomer,
} from "../models/khachhang.model.js"
import {
	createCustomerController,
	findCustomerController,
} from "../controller/khachhang.controller.js"
import verifyMiddleware from "../middleware/vetify.js"
import { permission } from "../middleware/permissions.js"

const khachhangRouter = Router()

khachhangRouter
	// TẠo này khoảng khách hàng
	.post("/create", verifyMiddleware, permission, createCustomerController)
	//Lấy tài khoản
	.get("/:id", verifyMiddleware, permission, findCustomerController)

export default khachhangRouter
