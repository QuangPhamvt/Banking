import { Card, Typography } from "@material-tailwind/react"
import { format } from "date-fns"
import { useSelector } from "react-redux"
import fail from "../../asset/fail.png"

export default function Table(props) {
	const data = useSelector((store) => store.deposit)
	// eslint-disable-next-line react/prop-types
	console.log(data)
	const TABLE_HEAD = props?.["head"] || []
	const TABLE_ROWS = data.data.getAllCustomerDeposit || []
	return (
		<Card className="overflow-scroll h-[400px] w-[350px] rounded-xl overflow-x-hidden border-2 ">
			{!data.success.getAllCustomerDeposit ? (
				<img
					src={fail}
					className="h-20 w-20 inline-block ml-[132px] mt-28"
				/>
			) : (
				<table className="w-full min-w-max table-auto text-left relative">
					<thead className=" sticky top-0 border-b-2 opacity-95 bg-white">
						<tr className="">
							{TABLE_HEAD.map((head) => (
								<th
									key={head}
									className="border-b-2  bg-blue-gray-50 p-4"
								>
									<Typography
										variant="small"
										color="blue-gray"
										className="font-normal leading-none opacity-70"
									>
										{head}
									</Typography>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{TABLE_ROWS.map(
							({ id, TienGoc, NgayDaoHan }, index) => {
								const isLast = index === TABLE_ROWS.length - 1
								const classes = isLast
									? "p-4"
									: "p-4 border-b border-blue-gray-50"

								const utcDate = format(
									new Date(NgayDaoHan),
									"dd/MM/yyyy"
								)
								return (
									<tr key={id}>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{index + 1}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal"
											>
												{parseFloat(TienGoc)}
											</Typography>
										</td>
										<td className={classes}>
											<Typography
												variant="small"
												color="blue-gray"
												className="font-normal text-center"
											>
												{utcDate}
											</Typography>
										</td>
									</tr>
								)
							}
						)}
					</tbody>
				</table>
			)}
		</Card>
	)
}
