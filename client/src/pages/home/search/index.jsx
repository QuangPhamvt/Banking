import { Typography } from "@material-tailwind/react"
import Table from "./table"
import SearchForm from "./searchForm"
function Search() {
	return (
		<div className="flex flex-col items-center bg-[#C1EAF2] border-x-2">
			<SearchForm />
			<div className=" w-4/5 h-[800px] my-4 flex flex-col justify-center ">
				<Typography
					variant={"h3"}
					className="text-center underline underline-offset-8 font-dancing font-thin"
				>
					Danh sách phiếu gửi tiền
				</Typography>
				<Table />
			</div>
		</div>
	)
}

export default Search
