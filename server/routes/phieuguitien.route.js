import { Router } from "express"
import {
	createDepositController,
	deleteDepositController,
	findDepositController,
	findDepositCustomerController,
	findDepositIDController,
	findDepositSearchController,
	updateDepositController,
} from "../controller/phieuguitien.controller.js"
import verifyMiddleware from "../middleware/vetify.js"
import { permission } from "../middleware/permissions.js"

const phieuguitienRouter = Router()
//middleware
phieuguitienRouter
	.use(verifyMiddleware)
	// Lấy tất cả phiếu tồn tại
	.get("/", permission, findDepositController)
	// cập nhập lại giá trị
	.get("/update", updateDepositController)
	// Lấy thông tin phiếu của một người khi có id
	.get("/id/:id", findDepositIDController)
	// Lấy các phiếu của 1 người
	.get("/:CMND", findDepositCustomerController)
	// TẠo 1 phiếu gửi tiền
	.post("/create", permission, createDepositController)
	// Lấy các phiếu theo search
	.post("/search/:page", permission, findDepositSearchController)
	//Rut tiền
	.put("/drawout/:id", permission, deleteDepositController)

export default phieuguitienRouter
