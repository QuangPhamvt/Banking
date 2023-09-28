import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {
	Typography,
	Navbar,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Button,
} from "@material-tailwind/react"
import { BsFillPersonFill } from "react-icons/bs"
import Footer from "../footer"
import { getLogoutUser } from "../../../store/auth/userThunk"
import ParameterDialog from "./parameterDialog"
import CreateUserDialog from "./createUserDialog"
const array = [
	{ name: "Phiếu Gửi Tiền", redirect: "deposit" },
	{ name: "Khách Hàng", redirect: "customer" },
	{ name: "Báo Cáo", redirect: "report" },
	{ name: "Tìm Kiếm", redirect: "search" },
]

const Navigation = () => {
	const navigate = useNavigate()
	const [openMenu, setOpenMenu] = useState(false)
	let isVerify = false
	let auth = useSelector((store) => store.auth.auth)
	isVerify = useSelector((store) => store.auth.success.verify)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!isVerify) return navigate("/")
	}, [isVerify])
	return (
		<>
			<Navbar className=" relative mx-auto grid grid-cols-12 z-0 shadow-xl">
				<div className="text-black col-span-3 text-center flex flex-row items-center h-16">
					<span className="text-4xl font-bold font-dancing italic text-primary">
						Mami Nanami
					</span>
					{auth === "Admin" && (
						<span className="mt-12 ml-2 font-dancing ">Admin</span>
					)}
				</div>
				<ul className="flex flex-row justify-end col-span-8 items-center">
					{array.map((state, index) => (
						<NavLink
							key={index}
							to={state.redirect}
							className={({ isActive }) =>
								isActive ? `text-[#1c93e8]` : "text-black "
							}
							tabIndex={0}
						>
							<li
								key={index}
								className="hover:bg-blue-gray-50 py-2 px-4 rounded-xl"
							>
								<Typography variant="h4">
									{state.name}
								</Typography>
							</li>
						</NavLink>
					))}
				</ul>
				<div className="col-span-1 m-auto relative">
					<Menu open={openMenu} handler={setOpenMenu}>
						<MenuHandler>
							<Button
								variant="text"
								className=" hover:bg-white focus:bg-white rounded-full active:bg-white"
							>
								<BsFillPersonFill className="bg-white text-4xl rounded-full h-full w-full" />
							</Button>
						</MenuHandler>
						<MenuList>
							{auth === "Admin" && (
								<>
									<MenuItem className="p-0 mt-1">
										<ParameterDialog name={"Tham Số"} />
									</MenuItem>
									<MenuItem className="p-0 mt-1">
										<CreateUserDialog
											name={"Tạo Tài Khoản"}
										/>
									</MenuItem>
								</>
							)}
							<MenuItem onClick={() => dispatch(getLogoutUser())}>
								Log Out
							</MenuItem>
						</MenuList>
					</Menu>
				</div>
			</Navbar>
			<Outlet />
			<Footer />
		</>
	)
}

export default Navigation
