import { Router } from "express"
import verifyMiddleware from "../middleware/vetify.js"
import { permission } from "../middleware/permissions.js"
import { updateLTKController } from "../controller/LTK.controller.js"

const LTKRouter = Router()

LTKRouter.use(verifyMiddleware)
	.use(permission)
	.put("/update", updateLTKController)

export default LTKRouter
