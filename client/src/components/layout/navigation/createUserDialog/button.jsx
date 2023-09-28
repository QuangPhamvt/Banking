import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
} from "@material-tailwind/react"
import { useState } from "react"
import { useSelector } from "react-redux"

function ButtonForm() {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)
	const store = useSelector((store) => store.auth)

	return (
		<>
			<Button
				onClick={handleOpen}
				className={`mt-6`}
				fullWidth
				type="submit"
			>
				Register
			</Button>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>Thông báo tạo nhân viên</DialogHeader>
				<DialogBody
					divider
					className={`${
						store.success.postCreateUser ? "" : "text-red-300"
					}`}
				>
					{store.message.postCreateUser}
				</DialogBody>
				<DialogFooter>
					<Button
						variant="gradient"
						color="green"
						onClick={handleOpen}
					>
						<span>Confirm</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	)
}

export default ButtonForm
