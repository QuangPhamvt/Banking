import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Typography,
} from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import DialogForm from "./dialogTable"
import format from "date-fns/format"
import glass from "../../../asset/glassglass.avif"
import { useContext } from "react"
import { Context } from "../../../Context"
import { postSearchDeposit } from "../../../store/deposit/depositThunk"

const TABLE_HEAD = [
	"Mã Phiếu",
	"Loại Kỳ Hạn",
	"Lãi Suất",
	"Ngày Gửi",
	"Ngày Đáo Hạn",
	"Tiền Gốc",
	"Tiền Dư",
	"Ngày Đóng Sổ",
]
function Table() {
	const dispatch = useDispatch()
	const [context] = useContext(Context)
	const data = useSelector((store) => store.deposit)
	const TABLE_ROWS = data.data.postSearchDeposit.data
	const handleNextPage = () => {
		dispatch(
			postSearchDeposit({
				...context.postSearchDeposit,
				page: data.data.postSearchDeposit.page + 1,
			})
		)
	}
	const handlePreviousPage = () => {
		dispatch(
			postSearchDeposit({
				...context.postSearchDeposit,
				page: data.data.postSearchDeposit.page - 1,
			})
		)
	}
	return (
		<Card className="overflow-scroll h-[660px] w-full mt-2 border-2 shadow-xl ">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div>
						<Typography variant="h5" color="blue-gray">
							Tiền là của khách hàng
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							Thận trọng khi thao tác!
						</Typography>
					</div>
				</div>
			</CardHeader>
			{!data.success.postSearchDeposit ? (
				<img
					src={glass}
					alt=""
					className="h-[600px] w-[300px] ml-96 mt-20"
				/>
			) : (
				<>
					<CardBody>
						<table className="w-full min-w-max table-auto text-left relative rounded-2xl border-8">
							<thead className=" sticky top-0">
								<tr>
									{TABLE_HEAD.map((head) => (
										<th
											key={head}
											className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
										>
											<Typography
												variant="h6"
												color="blue-gray"
												className="font-bold leading-none opacity-70 text-center"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{TABLE_ROWS.map(
									(
										{
											id,
											TenLoaiTietKiem,
											LaiSuat,
											NgayMoSo,
											NgayDongSo,
											NgayDaoHan,
											TienDu,
											TienGoc,
										},
										index
									) => {
										const isLast =
											index === TABLE_ROWS.length - 1
										const classes = isLast
											? "p-4"
											: "p-4 border-b border-blue-gray-50"
										const NMS = format(
											new Date(NgayMoSo),
											"dd/MM/yyyy"
										)
										const NDH = format(
											new Date(NgayDaoHan),
											"dd/MM/yyyy"
										)
										const NDS = format(
											new Date(NgayDongSo),
											"dd/MM/yyyy"
										)

										return (
											<tr
												key={id}
												className="hover:bg-blue-gray-100"
											>
												<td
													className={`${classes} hover:cursor-pointer text-center`}
												>
													<DialogForm id={id} />
												</td>
												<td
													className={`${classes} bg-blue-gray-50/50`}
												>
													<Typography
														variant="small"
														className="font-normal text-center"
													>
														{TenLoaiTietKiem}
													</Typography>
												</td>
												<td className={classes}>
													<Typography
														variant="small"
														className="font-normal text-center"
													>
														{LaiSuat}
													</Typography>
												</td>
												<td
													className={`${classes} bg-blue-gray-50/50`}
												>
													<Typography
														variant="small"
														className="font-medium text-center"
													>
														{NMS}
													</Typography>
												</td>
												<td className={{ classes }}>
													<Typography
														variant="small"
														className="font-medium text-center"
													>
														{NDH}
													</Typography>
												</td>
												<td
													className={`${classes} bg-blue-gray-50/50`}
												>
													<Typography
														variant="small"
														className="font-medium text-center"
													>
														{parseInt(TienGoc)}
													</Typography>
												</td>
												<td className={{ classes }}>
													<Typography
														variant="small"
														className="font-medium text-center"
													>
														{parseInt(TienDu)}
													</Typography>
												</td>
												<td
													className={`${classes} bg-blue-gray-50/50`}
												>
													<Typography
														variant="small"
														className="font-medium text-center"
													>
														{NgayDongSo
															? NDS
															: "00-00-00"}
													</Typography>
												</td>
											</tr>
										)
									}
								)}
							</tbody>
						</table>
					</CardBody>
				</>
			)}
			<CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
				<Typography
					variant="small"
					color="blue-gray"
					className="font-normal"
				>
					{`Page ${data.data.postSearchDeposit.page} of ${data.data.postSearchDeposit.maxPage}`}
				</Typography>
				<div className="flex gap-2">
					<Button
						variant="outlined"
						color="blue-gray"
						size="sm"
						onClick={() => {
							if (data.data.postSearchDeposit.page > 1)
								handlePreviousPage()
						}}
					>
						Previous
					</Button>
					<Button
						variant="outlined"
						color="blue-gray"
						size="sm"
						onClick={() => {
							if (
								data.data.postSearchDeposit.page <
								data.data.postSearchDeposit.maxPage
							)
								handleNextPage()
						}}
					>
						Next
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}

export default Table
