import { useState, useEffect } from 'react'

type FetchState = 'idle' | 'loading' | 'error' | 'success'

function useFetch(fetchFunction: () => Promise<unknown>) {
	const [state, setState] = useState<FetchState>('idle')
	const [data, setData] = useState<unknown>(null)
	const [error, setError] = useState<unknown>(null)

	// const refetch = async () => {
	// 	setState('loading')
	// 	try {
	// 		const data = await fetchFunction()
	// 		setData(data)
	// 		setState('success')
	// 	} catch (error) {
	// 		setError(error)
	// 		setState('error')
	// 	}
	// }

	useEffect(() => {
		setState('loading')
		fetchFunction()
			.then((data) => {
				setData(data)
				setState('success')
			})
			.catch((error) => {
				setError(error)
				setState('error')
			})
	}, [fetchFunction])

	return { state, data, error }
}

export default useFetch
