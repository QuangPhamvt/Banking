import { Router } from "express"
import { mysql } from "../models/index.js"
import { permission } from "../middleware/permissions.js"
import verifyMiddleware from "../middleware/vetify.js"

const thamsoRouter = Router()

thamsoRouter.put(
	"/STTT",
	verifyMiddleware,
	permission,
	async function (req, res, next) {
		const { STTT } = req.body
		try {
			if (STTT) {
				await mysql.query(
					`update THAMSO SET SoTienGuiBanDauToiThieu = ?`,
					[STTT]
				)
				return res.status(200).json({
					success: true,
					message: "nice",
				})
			} else {
				return res.status(400).json({
					success: false,
					message: "sai",
				})
			}
		} catch (error) {
			next(error)
		}
	}
)

export default thamsoRouter
