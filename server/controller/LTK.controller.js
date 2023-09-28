import { mysql } from "../models/index.js"

export async function updateLTKController(req, res, next) {
	try {
		const { LTK, LaiSuat, NgayApDung } = req.body
		if (LTK && LaiSuat && NgayApDung) {
			await mysql.query(
				`UPDATE LOAITIETKIEM
            SET LaiSuatCu = LaiSuat, LaiSuat = ?, NgayApDung = ?
            WHERE 
                TenLoaiTietKiem = ? `,

				[LaiSuat, NgayApDung, LTK]
			)
			return res.status(200).json({
				success: true,
				message: "Nice",
			})
		} else
			return res.status(400).json({
				success: false,
				message: "ko hop le",
			})
	} catch (error) {
		next(error)
	}
}
