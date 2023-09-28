import { Routes, Route } from "react-router-dom"
import TestApi from "../../test/api"
import NotFound from "./notFoundPage"
import Navigation from "../components/layout/navigation"
import Landing from "./Landing"
import Home from "./home"

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/home" element={<Navigation />}>
				<Route index element={<Home />} />
				<Route path=":name" element={<Home />} />
			</Route>
			<Route path="/test" element={<TestApi />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	)
}

export default Router
