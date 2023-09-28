import { BsSearch } from "react-icons/bs"
import { Input } from "@material-tailwind/react"
import { useDispatch } from "react-redux"
import Table from "../../components/ui/table"
import useForm from "../../hooks/useForm"
import { getAllCustomerDeposit } from "../../store/deposit/depositThunk"
import { getCustomer } from "../../store/customer/customerThunk"
function LTKCard() {
	const dispatch = useDispatch()
	const [input, handleChange, handleSubmit] = useForm(
		{ CMND: "0" },
		(object) => {
			dispatch(getAllCustomerDeposit(object.CMND))
			dispatch(getCustomer(object.CMND))
		}
	)
	return (
		<div className=" col-span-1 border-l-2 h-[720px] my-[40px] pl-8 ">
			<div className=" mt-5 mx-8 h-[700px] rounded-3xl flex flex-col items-center gap-4">
				<h2 className="font-dancing pb-2 border-b-2 border-black mt-10">
					Phiếu của khách hàng
				</h2>

				<form onSubmit={handleSubmit} className="">
					<Input
						type="text"
						value={input.CMND}
						name="CMND"
						onChange={handleChange}
						icon={<BsSearch />}
						label="CMNN khách hàng"
						className="w-[280px]"
					/>
				</form>
				<div>
					<Table head={["STT", "Tiền Gốc", "Ngày Đáo Hạn", ""]} />
				</div>
			</div>
		</div>
	)
}

export default LTKCard
