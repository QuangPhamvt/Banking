import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Radio,
} from "@material-tailwind/react"
import useForm from "../../../hooks/useForm"
import { createCustomer } from "../../../store/customer/customerThunk"
import { useState, Fragment } from "react"
import useStore from "../../../hooks/useStore"

const array = ["male", "female"]
const CustomerCard = () => {
	const [dispatch, store] = useStore((store) => store.customer)
	const [open, setOpen] = useState(false)
	const [input, handleChange, handleSubmit, reset] = useForm(
		{
			HoTenKhachHang: "",
			NgaySinh: "",
			CMND: "",
			DiaChi: "",
			Tuoi: 0,
			SDT: "",
			GioiTinh: "",
		},
		(input) => {
			dispatch(createCustomer(input))
		}
	)
	const handleOpen = () => {
		setOpen(!open)
	}
	const arrayCustomer = [
		{ label: "Địa chỉ", type: "text", name: "DiaChi" },
		{ label: "Tuổi", type: "number", name: "Tuoi" },
		{ label: "Ngày Sinh", type: "date", name: "NgaySinh" },
		{ label: "Số Điện Thoại", type: "text", name: "SDT" },
	]
	return (
		<main className="  h-full flex flex-col items-center gap-6">
			<h1 className="mt-[40px] font-dancing text-primary select-none">
				Khách Hàng
			</h1>
			<form
				className=" border-2 h-[400px] w-[800px] flex flex-col gap-4 p-11 rounded-3xl bg-[#C1EAF2] hover:shadow-lg"
				onSubmit={handleSubmit}
				id="form"
			>
				<div className="w-full flex  items-center">
					<label className=" w-60 text-xl font-bold">Họ Tên</label>
					<div className="w-72">
						<Input
							type="text"
							variant="outlined"
							label="Họ tên"
							name="HoTenKhachHang"
							value={input.HoTenKhachHang}
							onChange={handleChange}
						/>
					</div>
				</div>

				<div className="w-full flex items-center">
					<label className=" w-60 text-xl font-bold">
						Chứng Minh Nhân Dân
					</label>
					<div className="w-72">
						<Input
							variant="outlined"
							label="CMND"
							type="text"
							name="CMND"
							value={input.CMND}
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="flex flex-row flex-wrap gap-y-4 gap-x-12 mt-2">
					{arrayCustomer.map((state, index) => {
						return (
							<div
								key={index}
								className="w-[320px] flex flex-row items-center "
							>
								<label className=" w-[400px] font-bold">
									{state.label}
								</label>
								<div>
									<Input
										variant="outlined"
										label={state.label}
										type={state.type}
										name={state.name}
										value={input[state.name]}
										onChange={handleChange}
									/>
								</div>
							</div>
						)
					})}

					<div className="w-[320px] flex flex-row items-center">
						<label className=" w-60 font-bold">Giới tính</label>
						<div className=" w-96" onChange={handleChange}>
							{array.map((state, index) => (
								<Radio
									key={index}
									id={index}
									name="GioiTinh"
									value={state}
									label={state}
								/>
							))}
						</div>
					</div>
				</div>

				<div className="flex flex-row-reverse gap-5">
					<Button variant="outlined" color="red" onClick={reset}>
						HỦY
					</Button>
					<Fragment>
						<Button
							variant="gradient"
							type="submit"
							onClick={handleOpen}
						>
							XÁC NHẬN
						</Button>
						<Dialog
							open={open}
							handler={handleOpen}
							className=" duration-0 ease-linear  animate-none"
						>
							<DialogHeader>Xác Nhận</DialogHeader>
							{store.success.createCustomer ? (
								<DialogBody>Tạo thành công</DialogBody>
							) : (
								<DialogBody className="text-red-300">
									{store.message.createCustomer}
								</DialogBody>
							)}
							<DialogFooter>
								<Button
									variant="gradient"
									color="blue"
									onClick={() => {
										handleOpen()
										reset()
										document.getElementById("form").reset()
									}}
								>
									<span>OK</span>
								</Button>
							</DialogFooter>
						</Dialog>
					</Fragment>
				</div>
			</form>
		</main>
	)
}

export default CustomerCard
