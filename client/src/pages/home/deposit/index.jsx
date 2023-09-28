import DepositForm from "./depositForm"
import DepositCard from "./depositCard"
import LTKCard from "../LTK"

function Deposit() {
	return (
		<div className="grid grid-cols-3 h-full -z-10">
			<div className=" col-span-2">
				<main className="  h-full flex flex-col items-center gap-6">
					<h1 className="mt-[40px] font-dancing text-primary select-none">
						Phiếu Gửi Tiền
					</h1>
					<DepositForm />
					<DepositCard />
				</main>
			</div>
			<LTKCard />
		</div>
	)
}

export default Deposit
