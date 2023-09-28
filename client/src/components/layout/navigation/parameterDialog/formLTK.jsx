import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Radio,
	Typography,
} from "@material-tailwind/react"
import useForm from "../../../../hooks/useForm"
import axiosClient from "../../../../api/axiosClient"
import { useState } from "react"

const array = ["Không Kỳ Hạn", "3 Tháng", "6 Tháng"]
function FormLTK({ choose }) {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	const [isSuccess, setIsSuccess] = useState()
	const [input, handleChange, handleSubmit, reset] = useForm(
		{
			LTK: "",
			NgayApDung: "",
			LaiSuat: 0,
		},
		async (object) => {
			try {
				console.log(object)
				const data = await axiosClient.put("/LTK/update", object)
				console.log(data)
				setIsSuccess(data.success)
			} catch (error) {
				console.log(error.response)
				setIsSuccess(false)
			}
		}
	)
	return (
		<form
			className="w-80"
			onKeyDown={(event) => {
				if (event.key === "Tab") {
					event.stopPropagation()
				}
			}}
			onSubmit={handleSubmit}
		>
			<div
				className={`mb-4 flex flex-col gap-6 ${
					choose === "LTK" ? "" : "hidden"
				}`}
			>
				<Typography
					variant="h4"
					color="blue-gray"
					className="text-center"
				>
					Sửa Loại Tiết Kiệm
				</Typography>
				<Input
					size="lg"
					label="Lãi Suất "
					type="number"
					value={input.LaiSuat}
					name={"LaiSuat"}
					onChange={handleChange}
				/>
				<Input
					size="lg"
					label="Ngày Áp Dụng"
					type="date"
					value={input.NgayApDung}
					name="NgayApDung"
					onChange={handleChange}
				/>
				<div className="w-full flex flex-col items-start">
					<label htmlFor="LTK" className=" w-60 text-xl font-bold">
						Mã Loại Tiết Kiệm
					</label>
					<div className=" w-96" onChange={handleChange}>
						{array.map((state, index) => (
							<Radio
								key={index}
								id={index}
								name="LTK"
								value={state}
								label={state}
							/>
						))}
					</div>
				</div>
				<Button variant="gradient" type="submit" onClick={handleOpen}>
					XÁC NHẬN
				</Button>
				<Dialog
					open={open}
					handler={handleOpen}
					className=" duration-0 ease-linear animate-none"
				>
					<DialogHeader>Xác Nhận</DialogHeader>
					{isSuccess ? (
						<DialogBody>Tạo thành công</DialogBody>
					) : (
						<DialogBody>
							<Typography color="red">
								Yêu cầu không hợp lệ
							</Typography>
						</DialogBody>
					)}
					<DialogFooter>
						<Button
							variant="gradient"
							color="blue"
							onClick={() => {
								handleOpen()
								reset()
							}}
						>
							<span>OK</span>
						</Button>
					</DialogFooter>
				</Dialog>
			</div>
		</form>
	)
}

export default FormLTK
