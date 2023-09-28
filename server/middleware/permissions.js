import { mysql } from "../models/index.js"

export async function permission(req, res, next) {
	const index = Object.values(req.params)[0]?.length
	let url = req.protocol + "://" + req.get("host") + req.originalUrl
	const { username } = req.body.user
	index && (url = url.slice(0, url.length - index - 1))
	try {
		const [data] = await mysql.query(
			`select Url, Action from NGUOIDUNG ND
            inner join PHANQUYEN PQ on ND.MaNhom = PQ.MaNhom
            inner join CHUCNANG CN on CN.id = PQ.MaChucNang
            where Url = ? and username = ?  and Action = ?`,
			[url, username, req.method]
		)
		if (data?.[0]) return next()
		return res.status(400).json({
			success: false,
			message: "Khong co quyen truy cap",
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: error.message,
		})
	}
}
