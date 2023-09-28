import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Input,
	Typography,
} from "@material-tailwind/react"
import { useState } from "react"
import axiosClient from "../../../../api/axiosClient"
import useForm from "../../../../hooks/useForm"
function FormMoney({ choose }) {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	const [isSuccess, setIsSuccess] = useState()
	const [input, handleChange, handleSubmit, reset] = useForm(
		{
			STTT: 0,
		},
		async (object) => {
			try {
				console.log(object)
				const data = await axiosClient.put("/parameter/STTT", object)
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
			onKeyDown={(event) => {
				if (event.key === "Tab") {
					event.stopPropagation()
				}
			}}
			onSubmit={handleSubmit}
		>
			<div
				className={`mb-4 flex flex-col gap-6 ${
					choose === "Money" ? "" : "hidden"
				}`}
			>
				<Typography
					variant="h4"
					color="blue-gray"
					className="text-center"
				>
					Sửa Số Tiền Tối Thiểu
				</Typography>
				<Input
					size="lg"
					label="Số Tiền"
					type="number"
					name="STTT"
					value={input.STTT}
					onChange={handleChange}
				/>
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

export default FormMoney
