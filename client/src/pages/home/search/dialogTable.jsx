import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Typography,
} from "@material-tailwind/react"
import { useState } from "react"
import {
	getIDDeposit,
	putDeleteDeposit,
} from "../../../store/deposit/depositThunk"
import useStore from "../../../hooks/useStore"

// eslint-disable-next-line react/prop-types
export default function DialogForm({ id }) {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)
	const [dispatch, store] = useStore(
		(store) => store.deposit.data.getIDDeposit
	)

	const handle = () => {
		dispatch(getIDDeposit(id))
	}
	const handleDeleteDeposit = () => {
		dispatch(putDeleteDeposit(id))
		setOpen(!open)
	}
	return (
		<>
			<Button
				onClick={() => {
					handle()
					handleOpen()
				}}
				variant="gradient"
				className="h-10 w-40"
			>
				{id}
			</Button>
			<Dialog open={open} handler={handleOpen}>
				<DialogHeader>Rút Tiền</DialogHeader>
				<DialogBody divider className="grid grid-cols-2 ml-8 ">
					<Typography variant="h6">ID: {store[0]?.id}</Typography>
					<Typography variant="h6">
						CMND/CCCD: {store[0]?.CMND}
					</Typography>
					<Typography variant="h6">
						Họ Tên Khách Hàng: {store[0]?.HoTenKhachHang}
					</Typography>
					<Typography variant="h6">
						Loại Tiết Kiệm: {store[0]?.TenLoaiTietKiem}
					</Typography>
					<Typography variant="h6">
						Tiền Dư: {parseInt(store[0]?.TienDu)}
					</Typography>
				</DialogBody>
				<DialogFooter>
					<Button
						variant="text"
						color="red"
						onClick={handleOpen}
						className="mr-1"
					>
						<span>Hủy yêu cầu</span>
					</Button>
					<Button
						variant="gradient"
						color="green"
						onClick={handleDeleteDeposit}
					>
						<span>Rút Tiền</span>
					</Button>
				</DialogFooter>
			</Dialog>
		</>
	)
}
