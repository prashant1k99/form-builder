import { IoMdFunnel } from 'react-icons/io'
import { Button } from '../ui/button'
import SubmissionTable from './SubmissionTable'
import Loader from '../Loader'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { useEffect, useState } from 'react'
import { fetchSubmissions as fetchSubmissionsFromState } from '@/state/submissions'

export default function FormSubmission({ id }: { id: string }) {
	const [isSubmissionLoading, setIsSubmissionLoading] = useState(false)
	const submissions = useAppSelector((state) => {
		if (!state.submissions[id]) return []
		return state.submissions[id]?.submissions || []
	})

	const dispatch = useAppDispatch()

	const fetchSubmissions = () => {
		setIsSubmissionLoading(true)
		dispatch(
			fetchSubmissionsFromState({
				formId: id,
			})
		)
			.catch((error) => {
				console.error(error)
			})
			.finally(() => {
				setIsSubmissionLoading(false)
			})
	}

	const data = [
			{
				id: '1',
				data: {
					name: 'Example Name',
					email: 'example@email.com',
					phone: 6354164973,
				},
			},
			{
				id: '2',
				data: {
					name: 'Example Name',
					email: 'example@email.com',
					phone: 6354164973,
				},
			},
			{
				id: '3',
				data: {
					name: 'Example Name',
					email: 'example@email.com',
					phone: 6354164973,
				},
			},
			{
				id: '4',
				data: {
					name: 'Example Name',
					email: 'example@email.com',
					phone: 6354164973,
				},
			},
		],
		headers = ['Name', 'Email', 'Phone']

	useEffect(() => {
		if (!submissions.length) {
			setIsSubmissionLoading(true)
			fetchSubmissions()
		}
	}, [id])

	return (
		<div className="h-full">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6">Submission</h1>
					<p className="mt-2 text-sm text-muted-foreground">
						A list of all the submissions for this form.
					</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex flex-row gap-2">
					<Button variant={'secondary'} className="w-full md:w-fit">
						<IoMdFunnel className="w-4 h-4" />
					</Button>
					<Button disabled variant={'secondary'} className="w-full md:w-fit">
						Export
					</Button>
				</div>
			</div>
			<div className="h-full">
				{isSubmissionLoading ? (
					<Loader />
				) : (
					<>
						<pre className="text-sm text-muted-foreground">
							{JSON.stringify(submissions, null, 2)}
						</pre>
						<SubmissionTable
							headers={headers}
							data={data}
							recordClicked={(id) => {
								console.log(id)
							}}
						/>
					</>
				)}
			</div>
		</div>
	)
}
