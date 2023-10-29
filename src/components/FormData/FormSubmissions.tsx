import { PiGearSixLight } from 'react-icons/pi'
import { Button } from '../ui/button'
import SubmissionTable from './SubmissionTable'
import { useState } from 'react'
import Loader from '../Loader'

export default function FormSubmission() {
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

	const [isLoading, setIsLoading] = useState(true)
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
						<PiGearSixLight className="w-4 h-4" />
					</Button>
					<Button disabled variant={'secondary'} className="w-full md:w-fit">
						Export
					</Button>
				</div>
			</div>
			<div className="h-full">
				{isLoading ? (
					<Loader />
				) : (
					<SubmissionTable
						headers={headers}
						data={data}
						recordClicked={(id) => {
							console.log(id)
						}}
					/>
				)}
			</div>
		</div>
	)
}
