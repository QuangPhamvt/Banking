import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	Typography,
} from "@material-tailwind/react"
import { Fragment, useState } from "react"
import FormLTK from "./formLTK"
import FormMoney from "./formMoney"

const array = [
	{
		name: "LTK",
		label: "Sửa Loại Tiết Kiệm",
	},
	{
		name: "Money",
		label: "Sửa Tiền Tối Thiểu",
	},
]
function ParameterDialog({ name }) {
	const [open, setOpen] = useState(false)
	const [choose, setChoose] = useState("LTK")
	const handleChoose = (name) => setChoose(name)
	const handleOpen = () => setOpen((cur) => !cur)
	return (
		<Fragment>
			<Typography
				onClick={handleOpen}
				variant="h6"
				className="w-full h-full p-2"
			>
				{name}
			</Typography>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>Chỉnh sửa quy định</DialogHeader>
				<DialogBody divider>
					<div className=" grid grid-cols-12 h-[400px]">
						<div className=" col-span-8 border-r-2 px-28">
							<FormLTK choose={choose} />
							<FormMoney choose={choose} />
						</div>
						<div className=" col-span-4 flex flex-col mx-12 items-center justify-center gap-4">
							{array.map((state, index) => (
								<Button
									key={index}
									className={`w-full`}
									variant={`${
										choose === state.name
											? "gradient"
											: "text"
									}`}
									onClick={() => handleChoose(state.name)}
								>
									{state.label}
								</Button>
							))}
						</div>
					</div>
				</DialogBody>
				<DialogFooter className="mr-[340px]">
					Giàu vì bạn, sang vì vợ
				</DialogFooter>
			</Dialog>
		</Fragment>
	)
}

export default ParameterDialog
