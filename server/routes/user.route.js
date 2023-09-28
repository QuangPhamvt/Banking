import { Router } from "express"
import { customAlphabet } from "nanoid"
import { mysql } from "../models/index.js"
import {
	createUser,
	getToken,
	loginUser,
	logoutUser,
} from "../controller/user.controller.js"
import verifyMiddleware from "../middleware/vetify.js"
import { permission } from "../middleware/permissions.js"

const userRouter = Router()

userRouter
	.post("/login", loginUser)
	.use(verifyMiddleware)
	.get("/", permission, getToken)
	.get("/logout", permission, logoutUser)
	.post("/create", permission, createUser)
export default userRouter
