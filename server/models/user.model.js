import { mysql } from "./index.js"

export async function findUserModel(username) {
	return await mysql.query(
		`select username, password, NGD.TenNhom
        from NGUOIDUNG ND, NHOMNGUOIDUNG NGD
        where 
			username = ? and 
			NGD.id = ND.MaNhom`,
		[username]
	)
}

export async function createUserModel(data) {
	const { username, TenNhom, password } = data
	return await mysql.query(
		`insert into NGUOIDUNG(username, MaNhom, password)
        values(?, (select id from NHOMNGUOIDUNG where TenNhom = ?), ?)`,
		[username, TenNhom, password]
	)
}
