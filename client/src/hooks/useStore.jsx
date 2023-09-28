import { useDispatch, useSelector } from "react-redux"

function useStore(callback) {
	const dispatch = useDispatch()
	const store = useSelector(callback)
	return [dispatch, store]
}

export default useStore
