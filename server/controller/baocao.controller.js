import { findAllReportModel } from "../models/baocao.model.js"
import { mysql } from "../models/index.js"

export async function findAllReportConller(req, res, next) {
	try {
		const [data] = await findAllReportModel()
		return res.status(200).json({
			success: true,
			data,
			message: "Lấy dữ liệu thành công",
		})
	} catch (error) {
		next(error)
	}
}
export async function findReportController(req, res, next) {
	const body = req.body
	const { page } = req.params
	const limit = 8
	try {
		const stringNull = " is not null"
		const { user, ...dataModel } = body
		const array = Object.values({
			...dataModel,
			page: parseInt((page - 1) * limit),
			limit,
		})
		const queryPage = `
			select 
				count(*) as page
			from BAOCAODOANHSO BCDS
			inner join LOAITIETKIEM LTK on LTK.id = BCDS.LTK
			where 
				LTK.TenLoaiTietKiem ${body?.LTK ? " = ?" : stringNull} and
				BCDS.NgayBaoCao ${body?.NgayBaoCao ? " = ?" : stringNull}
		`
		const [maxPage] = await mysql.query(queryPage, array)
		const query = `
			select 
				LTK.TenLoaiTietKiem as LTK, 
				NgayBaoCao, TongThu, 
				TongChi, ChenhLech 
			from BAOCAODOANHSO BCDS
			inner join LOAITIETKIEM LTK on LTK.id = BCDS.LTK
			where 
				LTK.TenLoaiTietKiem ${body?.LTK ? " = ?" : stringNull} and
				BCDS.NgayBaoCao ${body?.NgayBaoCao ? " = ?" : stringNull}
			order by  NgayBaoCao DESC, TongThu DESC
			LIMIT ?, ?
			`
		const [data] = await mysql.query(query, array)
		return res.status(200).json({
			success: true,
			data: {
				data,
				page: parseInt(page),
				maxPage: Math.ceil(maxPage[0].page / limit),
			},
			message: "Lay thanh cong",
		})
	} catch (error) {
		next(error)
	}
}
