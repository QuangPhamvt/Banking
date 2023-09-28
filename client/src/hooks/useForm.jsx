import { useState } from "react"

function useForm(initialState = {}, onSubmit) {
	const [input, setInput] = useState(initialState)
	function handleChange(event) {
		setInput((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value,
		}))
	}
	function handleSubmit(event) {
		event.preventDefault()
		console.log(input)
		let object = {}
		for (const key in input) {
			input[key] && (object[key] = input[key])
		}
		onSubmit?.(object)
	}
	function reset() {
		setInput(() => initialState)
	}

	return [input, handleChange, handleSubmit, reset]
}

export default useForm
