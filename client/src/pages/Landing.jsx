import useForm from "../hooks/useForm"
import Footer from "../components/layout/footer"
import { useDispatch, useSelector } from "react-redux"
import { getVerifyUser, postLoginUser } from "../store/auth/userThunk"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Input, Typography } from "@material-tailwind/react"

const array = [
	{
		type: "text",
		name: "username",
		label: "USERNAME",
	},
	{
		type: "password",
		name: "password",
		label: "PASSWORD",
	},
]
function Landing() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	let isVerify = false
	isVerify = useSelector((store) => store.auth.success.verify)
	const isError = useSelector((store) => store.auth.message.postLoginUser)
	const [input, handleChange, handleSubmit] = useForm(
		{
			username: "",
			password: "",
		},
		(input) => {
			dispatch(postLoginUser(input))
		}
	)
	useEffect(() => {
		dispatch(getVerifyUser())
		isVerify && navigate("/home")
	}, [isVerify])

	return (
		<>
			<div className=" container mx-auto px-9 h-[600px]">
				<div className=" grid grid-cols-2 mt-40">
					<div className="mt-14 ml-12">
						<span className="text-7xl font-bold font-dancing text-primary">
							NGÂN HÀNG Mami Nanami
						</span>
						<br />
						<br />
						<span className="text-3xl italic font-dancing">
							<p>
								&quot; Mang phồn thịnh đến với khách hàng &quot;
							</p>
						</span>
					</div>
					<div className=" m-10 border-2 bg-[#87C1CD] rounded-xl shadow-2xl">
						<form
							onSubmit={handleSubmit}
							action=""
							className="m-14 mb-6 flex flex-col gap-4"
						>
							{array.map((state, index) => (
								<Input
									key={index}
									onChange={handleChange}
									type={state.type}
									name={state.name}
									value={input[state.name]}
									className="bg-white text-2xl h-14"
									label={state.label}
								/>
							))}
							<Button
								type="submit"
								className=" mx-16 h-14 rounded-2xl text-2xl text-white font-bold"
							>
								ĐĂNG NHẬP
							</Button>
							{isError === "Đăng nhập sai thông tin" && (
								<Typography color="red">{isError}</Typography>
							)}
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Landing
