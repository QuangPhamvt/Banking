import LTKCard from "../LTK"
import CustomerCard from "./customer"

function Customer() {
	return (
		<div className="grid grid-cols-3 h-full -z-10">
			<div className=" col-span-2">
				<CustomerCard />
			</div>
			<LTKCard />
		</div>
	)
}

export default Customer
