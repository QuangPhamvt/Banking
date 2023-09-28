import {
	Card,
	CardHeader,
	CardBody,
	Typography,
} from "@material-tailwind/react"
import { useSelector } from "react-redux"

function DepositCard() {
	const [data] = useSelector((store) => store.customer.data)
	const day = () => {
		if (!data?.NgaySinh) return ""
		const utcDate = new Date(data?.NgaySinh)
		const date = utcDate.getUTCDate()
		const month = utcDate.getMonth() < 12 ? utcDate.getMonth() + 1 : 1
		const year = utcDate.getFullYear()
		return `${date}-${month}-${year}`
	}
	return (
		<Card className="mt-10 w-[800px] h-[200px] bg-[#C1EAF2] hover:shadow-xl items-center">
			<CardHeader className=" text-center w-52">
				<h2 className=" font-bold font-nunito">KHÁCH HÀNG</h2>
			</CardHeader>
			<CardBody className="flex flex-col gap-4 pt-2 w-full">
				<Typography className="font-bold">
					Họ Tên Khách Hàng : {data?.HoTenKhachHang}
				</Typography>
				<Typography className="font-bold">
					Ngày tháng năm sinh : {day()}
				</Typography>
				<Typography className="font-bold">
					Chứng Minh Nhân Dân : {data?.CMND}{" "}
				</Typography>
				<Typography className="font-bold">
					Địa Chỉ : {data?.DiaChi}
				</Typography>
			</CardBody>
		</Card>
	)
}

export default DepositCard
