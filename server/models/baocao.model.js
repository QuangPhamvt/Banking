import { mysql } from "./index.js"

export async function findAllReportModel() {
	return mysql.query(
		`select 
				LTK.TenLoaiTietKiem as LTK, 
				NgayBaoCao, TongThu, 
				TongChi, ChenhLech 
			from BAOCAODOANHSO BCDS
			inner join LOAITIETKIEM LTK on LTK.id = BCDS.LTK`
	)
}
