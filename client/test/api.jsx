import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
	getAllCustomerDeposit,
	getAllDeposit,
	postCreateDeposit,
} from "../src/store/deposit/depositThunk"

function TestApi() {
	const dispatch = useDispatch()
	useEffect(() => {
		const data = {
			CMND: "559569036566",
			TienGoc: 1000000,
			LTK: "6 Tháng",
		}
		dispatch(postCreateDeposit(data))
	}, [])
	return <div>TEST</div>
}

export default TestApi
