import jwt from "jsonwebtoken"

export default async function verifyMiddleware(req, res, next) {
	try {
		const isToken = jwt.verify(req.cookies["authToken"], "CNPM")
		if (!isToken) {
			return res.status(401).json({
				success: false,
				message: "Bạn không có quyền truy cập vào trang này",
			})
		}

		req.body.user = isToken
		next()
	} catch (error) {
		return res.status(200).json({
			success: false,
			message: error.message,
		})
	}
}
