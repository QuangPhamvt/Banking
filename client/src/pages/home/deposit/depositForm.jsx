import {
	Input,
	Button,
	Radio,
	Dialog,
	DialogBody,
	DialogHeader,
	DialogFooter,
} from "@material-tailwind/react"
import { useState } from "react"
import { postCreateDeposit } from "../../../store/deposit/depositThunk"
import useForm from "../../../hooks/useForm"
import useStore from "../../../hooks/useStore"

const array = ["Không Kỳ Hạn", "3 Tháng", "6 Tháng"]
const array_form = [
	{ label: "Người Gửi", type: "text", name: "CMND" },
	{
		label: "Số Tiền",
		type: "number",
		name: "TienGoc",
	},
]
function DepositForm() {
	const [dispatch, store] = useStore((store) => store.deposit)
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	const [input, handleChange, handleSubmit, reset] = useForm(
		{
			LTK: "",
			CMND: "",
			TienGoc: 0,
		},
		(object) => {
			dispatch(postCreateDeposit(object))
		}
	)
	return (
		<form
			className=" border-2 h-[360px] w-[800px] flex flex-col gap-8 p-11 rounded-3xl bg-[#C1EAF2] hover:shadow-lg"
			onSubmit={handleSubmit}
			id="form"
		>
			<div className="w-full flex items-center">
				<label htmlFor="LTK" className=" w-52 text-xl font-bold">
					Mã Loại Tiết Kiệm
				</label>
				<div className=" w-96">
					{array.map((state, index) => (
						<Radio
							key={index}
							id={index}
							name="LTK"
							value={state}
							label={state}
							onClick={handleChange}
						/>
					))}
				</div>
			</div>

			{array_form.map((state, index) => {
				return (
					<div key={index} className="w-full flex items-center">
						<label className=" w-52 text-xl font-bold">
							{state.label}
						</label>
						<div>
							<Input
								className="w-[300px]"
								size="lg"
								onChange={handleChange}
								variant="outlined"
								label={state.label}
								type={state.type}
								name={state.name}
								value={input[state.name] || ""}
							/>
						</div>
					</div>
				)
			})}

			<div className="flex flex-row-reverse gap-x-5">
				<Button
					variant="outlined"
					color="red"
					type="reset"
					onClick={reset}
				>
					HỦY
				</Button>
				<Button variant="gradient" type="submit" onClick={handleOpen}>
					XÁC NHẬN
				</Button>
				<Dialog
					open={open}
					handler={handleOpen}
					className=" duration-0 ease-linear animate-none"
				>
					<DialogHeader>Xác Nhận</DialogHeader>
					{store.success.postCreateDeposit ? (
						<DialogBody>Tạo thành công</DialogBody>
					) : (
						<DialogBody className=" text-red-300">
							{store.message.postCreateDeposit}
						</DialogBody>
					)}
					<DialogFooter>
						<Button
							variant="gradient"
							color="blue"
							onClick={() => {
								document.getElementById("form").reset()
								reset()
								handleOpen()
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

export default DepositForm
