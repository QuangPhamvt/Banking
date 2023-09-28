import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Typography,
} from "@material-tailwind/react"
import { useDispatch, useSelector } from "react-redux"
import glass from "../../../asset/glassglass.avif"
import { useContext } from "react"
import { Context } from "../../../Context"
import { getReport } from "../../../store/report/reportThunk"

const TABLE_HEAD = [
	"Loại Kỳ Hạn",
	"Ngày Báo Cáo",
	"Tổng Thu",
	"Tổng Chi",
	"Tổng Chênh Lệch",
]

function Table() {
	const dispatch = useDispatch()
	const [context] = useContext(Context)
	const data = useSelector((store) => store.report)
	const TABLE_ROWS = data.data.getReport.data
	const handleNextPage = () => {
		console.log(context.report)
		dispatch(
			getReport({
				...context.getReport,
				page: data.data.getReport.page + 1,
			})
		)
	}
	const handlePreviousPage = () => {
		dispatch(
			getReport({
				...context.getReport,
				page: data.data.getReport.page - 1,
			})
		)
	}
	return (
		<Card className="overflow-scroll h-[700px] w-full mt-2 border-2 shadow-xl ">
			<CardHeader floated={false} shadow={false} className="rounded-none">
				<div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
					<div>
						<Typography variant="h5" color="blue-gray">
							Tiền là sức mạnh.
						</Typography>
						<Typography color="gray" className="mt-1 font-normal">
							Hãy xem kỹ càng trước khi quyết định.
						</Typography>
					</div>
				</div>
			</CardHeader>
			{!data.success.getReport ? (
				<img
					src={glass}
					alt=""
					className="h-[600px] w-[300px] ml-96 mt-20"
				/>
			) : (
				<>
					<CardBody>
						<table className="w-full min-w-max table-auto text-left relative">
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
												className="text-center leading-none opacity-70 font-bold"
											>
												{head}
											</Typography>
										</th>
									))}
								</tr>
							</thead>
							<tbody className="">
								{TABLE_ROWS.map(
									(
										{
											LTK,
											NgayBaoCao,
											TongThu,
											TongChi,
											ChenhLech,
										},
										index
									) => {
										const isLast =
											index === TABLE_ROWS.length - 1
										const classes = isLast
											? "p-4"
											: "p-4 border-b border-blue-gray-50"

										const utcDate = new Date(NgayBaoCao)
										const date = utcDate.getUTCDate() + 1
										const month =
											utcDate.getUTCMonth() < 12
												? utcDate.getUTCMonth() + 1
												: 1
										const year = utcDate.getFullYear()
										const string = `${date}-${month}-${year}`
										return (
											<tr
												key={index}
												className=" hover:bg-blue-gray-100 border-t-2 hover:shadow-2xl"
											>
												<td className={classes}>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal text-center"
													>
														{LTK}
													</Typography>
												</td>
												<td
													className={`${classes} bg-blue-gray-50/50`}
												>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal text-center"
													>
														{string}
													</Typography>
												</td>
												<td className={classes}>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal text-center"
													>
														{TongThu}
													</Typography>
												</td>
												<td
													className={`${classes} bg-blue-gray-50/50`}
												>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-medium text-center"
													>
														{TongChi}
													</Typography>
												</td>
												<td className={classes}>
													<Typography
														variant="small"
														color="blue-gray"
														className="font-normal text-center"
													>
														{ChenhLech}
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
					{`Page ${data.data.getReport.page} of ${data.data.getReport.maxPage}`}
				</Typography>
				<div className="flex gap-2">
					<Button
						variant="outlined"
						color="blue-gray"
						size="sm"
						onClick={() => {
							if (data.data.getReport.page > 1)
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
								data.data.getReport.page <
								data.data.getReport.maxPage
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
