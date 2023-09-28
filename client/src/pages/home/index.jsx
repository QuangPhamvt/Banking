import { useParams } from "react-router-dom"
import Deposit from "./deposit"
import Customer from "./customer"
import Report from "./report"
import Search from "./search"

function Home() {
	const name = useParams().name || "deposit"
	let data
	switch (name) {
		case "deposit":
			data = <Deposit />
			break
		case "customer":
			data = <Customer />
			break
		case "search":
			data = <Search />
			break
		case "report":
			data = <Report />
			break
	}
	return <div className="  container mx-auto px-2 z-10">{data}</div>
}

export default Home
