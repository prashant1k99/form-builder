import CreateForm from '@/components/Dashboard/CreateForm'
import FormListItem from '@/components/Dashboard/FormListItem'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import Forms from '@/data/forms'
import useAuth from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Form } from '@/types/forms'
import { useEffect, useState } from 'react'
import { AiOutlineFileAdd } from 'react-icons/ai'

function Dashboard() {
	const [formsLoading, setFormsLoading] = useState(true)
	const [formsList, setFormsList] = useState<Form[]>([])
	const { user } = useAuth()

	useEffect(() => {
		if (!user.uid) {
			setFormsLoading(true)
			return
		}
		Forms.getForms(user.uid)
			.then((forms) => {
				if (forms.length > 0) {
					setFormsList(forms)
					setFormsLoading(false)
				}
			})
			.catch((error) => {
				setFormsLoading(false)
				console.error(error)
				console.error(error)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description:
						error instanceof Error
							? error.message
							: 'An unknown error occurred.',
				})
			})
	}, [user])

	return (
		<div className={cn('my-5', formsLoading && 'h-full')}>
			{formsLoading && <Loader />}
			{!formsLoading && (
				<div className="flex flex-col max-w-[700px] w-full md:w-3/5 m-auto h-full p-5">
					<div className="w-full flex flex-col sm:flex-row justify-start sm:justify-between sm:items-center gap-4">
						<div>
							<h1 className="text-3xl font-bold font-sans">Your Forms</h1>
							<p className="text-sm text-muted-foreground">
								Here you can manage your forms.
							</p>
						</div>
						<CreateForm>
							<Button variant={'secondary'}>
								<AiOutlineFileAdd className="w-6 h-6 mr-2" />
								Create New Form
							</Button>
						</CreateForm>
					</div>
					<Separator className="my-6" />
					<div className="flex flex-col mt-4 gap-4">
						{formsList.map((form) => {
							return <FormListItem key={form.id} form={form} />
						})}
						{formsList.length === 0 && (
							<CreateForm>
								<div className="flex flex-col border justify-center items-center border-gray-600 rounded-md w-full space-x-4 p-4 h-[120px] cursor-pointer">
									<AiOutlineFileAdd className="w-6 h-6 mb-2" />
									<p className="text-sm text-muted-foreground">
										You don't have any forms yet. Click the button above to
										create one!
									</p>
								</div>
							</CreateForm>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Dashboard
