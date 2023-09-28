import { mysql } from "./index.js"
import { customAlphabet } from "nanoid"
const nanoid = customAlphabet("1234567890abcdef", 10)

//LẤY TẤT CẢ KHÁCH HÀNG
export async function findCustomer() {
	return mysql.query(`select * from KHACHHANG`)
}
//TẠo khách hàng
export function createCustomer(data) {
	const { HoTenKhachHang, CMND, DiaChi, Tuoi, NgaySinh, SDT, GioiTinh } = data
	return mysql.query(
		`insert into KHACHHANG(id, HoTenKhachHang, CMND, DiaChi, Tuoi, NgaySinh, SDT, GioiTinh) 
		values(?, ?, ?, ?, ?, ?, ?, ?)`,
		[nanoid(), HoTenKhachHang, CMND, DiaChi, Tuoi, NgaySinh, SDT, GioiTinh]
	)
}
//tìm khách hàng
export async function findOneCustomer(CMND) {
	return mysql.query(`select * from KHACHHANG KH where KH.CMND = ?`, [CMND])
}
