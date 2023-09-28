import { mysql } from "./index.js"
import { findOneCustomer } from "./khachhang.model.js"
import { customAlphabet } from "nanoid"
const nanoid = customAlphabet("123456789abcdef", 10)

//tạo phiếu gửi tiền
export async function createDeposit({ CMND, TienGoc, LTK }) {
	const [[KH]] = await findOneCustomer(CMND)
	const [[ltkId]] = await mysql.query(
		`select id 
        from LOAITIETKIEM 
        where TenLoaiTietKiem = ?`,
		[LTK]
	)
	if (!KH || !ltkId) return []
	return mysql.query(
		`insert into PHIEUGUITIEN(id, LTK, MaKhachHang, TienGoc, TienDu, NgayMoSo ) 
		values (?, ?, ?, ?, ?, ? )`,
		[nanoid(), ltkId.id, KH.id, TienGoc, TienGoc, new Date()]
	)
}
// update phieu
export async function updateDepositModel() {
	return mysql.query(
		`update PHIEUGUITIEN
		SET NgayDaoHan = current_timestamp()
		`
	)
}
// update xoa phieu cua nguoi dung
export async function updateDrawOut(data) {
	console.log(data)
	return mysql.query(
		`update PHIEUGUITIEN
        set TienDu = 0, NgayDongSo = current_date() 
        where id = ?`,
		[data]
	)
}

//Tìm kiếm 1 trang phiếu
export async function findDepositModel(data) {
	const { page, limit } = data
	const query = `
		select 
			PGT.id, 
			LTK.TenLoaiTietKiem, LTK.LaiSuat,
			KH.HoTenKhachHang, KH.CMND, KH.DiaChi, 
			PGT.NgayMoSo, PGT.NgayDongSo, PGT.NgayDaoHan, 
			PGT.TienDu, PGT.TienGoc 
		from PHIEUGUITIEN PGT
		inner join KHACHHANG KH on PGT.MaKhachHang = KH.id
		inner join LOAITIETKIEM LTK on LTK.id = PGT.LTK
		order by NgayMoSo DESC
		limit ?, ?`
	return mysql.query(query, [(page - 1) * limit, parseInt(limit)])
}
//Tìm kiếm phiếu mở rộng search
export async function findDepositSearchModel(data) {
	const stringNull = " is not null"
	const { user, Check, ...dataModel } = data
	const array = Object.values(dataModel)
	const query = `
		select 
			count(*) as page
		from CNPM.PHIEUGUITIEN PGT
		inner join CNPM.KHACHHANG KH on PGT.MaKhachHang = KH.id
		inner join CNPM.LOAITIETKIEM LTK on LTK.id = PGT.LTK
		where 
			TenLoaiTietKiem ${data?.LTK ? " = ?" : stringNull} and
			HoTenKhachHang ${data?.HoTenKhachHang ? " = ? " : stringNull} and
			SDT ${data?.SDT ? " = ?" : stringNull} and
			CMND ${data?.CMND ? " = ?" : stringNull} and
			NgayMoSo ${data?.NgayMoSo ? " = ?" : stringNull} and
			TienDu ${data?.Check === "true" ? stringNull : " != 0"}
		order by NgayDaoHan DESC
		`
	return mysql.query(query, array)
}
export async function findDepositSearchPageModel(data) {
	const stringNull = " is not null"
	const limit = 5
	const { user, Check, ...dataModel } = data
	const array = Object.values({
		...dataModel,
		page: (dataModel.page - 1) * limit,
		limit: limit,
	})
	const query = `
		select 
			PGT.id, 
			LTK.TenLoaiTietKiem, LTK.LaiSuat,
			PGT.NgayMoSo, PGT.NgayDongSo, PGT.NgayDaoHan, 
			PGT.TienDu, PGT.TienGoc
		from CNPM.PHIEUGUITIEN PGT
		inner join CNPM.KHACHHANG KH on PGT.MaKhachHang = KH.id
		inner join CNPM.LOAITIETKIEM LTK on LTK.id = PGT.LTK
		where 
			TenLoaiTietKiem ${data?.LTK ? " = ?" : stringNull} and
			HoTenKhachHang ${data?.HoTenKhachHang ? " = ? " : stringNull} and
			SDT ${data?.SDT ? " = ?" : stringNull} and
			CMND ${data?.CMND ? " = ?" : stringNull} and
			NgayMoSo ${data?.NgayMoSo ? " = ?" : stringNull} and
			TienDu ${data?.Check === "true" ? stringNull : " != 0"}
		order by NgayDaoHan DESC, PGT.id, LTK.TenLoaiTietKiem
		LIMIT  ?, ?
		`
	return mysql.query(query, array)
}

export async function findDepositCustomerModel(CMND) {
	return mysql.query(
		`select  
			PGT.id, LTK.TenLoaiTietKiem, PGT.LaiSuat, 
			NgayMoSo, NgayDongSo, NgayDaoHan, TienDu, TienGoc
		FROM PHIEUGUITIEN PGT 
        inner join KHACHHANG KH on KH.id = PGT.MaKhachHang
		inner join LOAITIETKIEM LTK on LTK.id = PGT.LTK
        where KH.CMND = ? and PGT.TienDU != 0
		order by PGT.NgayDaoHan DESC
		LIMIT 50
		`,
		[CMND]
	)
}
