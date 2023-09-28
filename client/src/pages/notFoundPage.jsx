import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../asset/tom.jpg"

function NotFound() {
	const navigate = useNavigate()
	useEffect(() => {
		setTimeout(() => {
			navigate("/")
		}, 3000)
	}, [])
	return (
		<div className="text-5xl grid grid-cols-12 h-[960px]">
			<div className=" col-span-4 h-full flex flex-col items-center justify-center">
				<img src={logo} alt="" className="h-[400px] w-[400px]" />
				<h1 className=" font-dancing text-3xl mt-12">404 NotFound</h1>
				<h1 className=" font-dancing mt-8 text-red-900 font-bold text-7xl mb-80">
					I don&#39;t like you
				</h1>
			</div>
			<div className=" col-span-8 h-full flex flex-col items-center justify-center gap-2">
				<h1 className=" font-dancing italic text-black ">
					Tom, don&#39;t go! You&#39;re still my bestfriend.
				</h1>
				<h2 className="mb-12 w-[600px] text-end font-dancing">
					--500 days of summer--
				</h2>
				<h1 className=" font-dancing italic text-red-400">
					We&#39;re just friend!
				</h1>
				<h1 className=" font-dancing italic text-orange-400">
					We&#39;re just friend!
				</h1>
				<h1 className=" font-dancing italic text-yellow-400">
					We&#39;re just friend!
				</h1>
				<h1 className=" font-dancing italic text-green-400">
					We&#39;re just friend!
				</h1>
				<h1 className=" font-dancing italic text-blue-400">
					We&#39;re just friend!
				</h1>
				<h1 className=" font-dancing italic text-indigo-400">
					We&#39;re just friend!
				</h1>
				<h1 className=" font-dancing italic text-purple-400">
					We&#39;re just friend!
				</h1>
			</div>
		</div>
	)
}

export default NotFound
