import Router from "./pages/index"
import { useState } from "react"
import { Context } from "./Context"

const initializ = {
	postSearchDeposit: {},
	getReport: {},
}
export default function App() {
	const [context, setContext] = useState(initializ)
	return (
		<Context.Provider value={[context, setContext]}>
			<Router />
		</Context.Provider>
	)
}
