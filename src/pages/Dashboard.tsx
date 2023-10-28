import Forms from '@/data/forms'
import useAuth from '@/hooks/useAuth'
import { Form } from '@/types/forms'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
// import { ToastAction } from '@/components/ui/toast'

type FetchState = 'idle' | 'loading' | 'error' | 'success'

function Dashboard() {
	const { user } = useAuth()
	const [formsList, setFormsList] = useState<Form[]>([])
	const [state, setState] = useState<FetchState>('idle')

	useEffect(() => {
		setState('loading')
		if (!user.uid) return
		Forms.getForms(user.uid)
			.then((formData) => {
				setFormsList(formData)
				setState('success')
			})
			.catch((error) => {
				console.error(error)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description:
						error instanceof Error
							? error.message
							: 'An unknown error occurred.',
				})
				setState('error')
			})
	}, [user.uid])

	return (
		<div>
			<h1>Dashboard</h1>
			{state == 'loading' && <p>Loading...</p>}
			{state == 'success' &&
				formsList.map((form) => {
					return (
						<div key={form.id}>
							<h2>{form.name}</h2>
							<p>{form.description}</p>
						</div>
					)
				})}
		</div>
	)
}

export default Dashboard
