import { Router } from "express"
import LTKRouter from "./LTK.route.js"
import userRouter from "./user.route.js"
import testRouter from "../test.js"
import baocaoRouter from "./baocao.route.js"
import thamsoRouter from "./thamso.route.js"
import khachhangRouter from "./khachhang.route.js"
import phieuguitienRouter from "./phieuguitien.route.js"

const router = Router()

router.get("/", (req, res) => {
	res.json({
		message: "router",
	})
})
router.use("/deposit", phieuguitienRouter)
router.use("/customer", khachhangRouter)
router.use("/report", baocaoRouter)
router.use("/user", userRouter)
router.use("/LTK", LTKRouter)
router.use("/test", testRouter)
router.use("/parameter", thamsoRouter)

export default router
