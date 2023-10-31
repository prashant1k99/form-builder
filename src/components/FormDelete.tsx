import { useState } from 'react'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog'
import { ImSpinner2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { deleteForm as deleteFormById } from '@/state/form'
import { toast } from './ui/use-toast'

const FormDelete = ({
	children,
	formId,
}: {
	children: React.ReactNode
	formId: string
}) => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const deleteForm = () => {
		if (isFormDeleting) return
		setIsFormDeleting(true)
		dispatch(
			deleteFormById({
				formId,
			})
		)
			.then(() => {
				navigate(`/`)
			})
			.catch((error) => {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description:
						error instanceof Error
							? error.message
							: 'An unknown error occurred.',
				})
			})
			.finally(() => {
				setIsFormDeleting(false)
			})
	}

	const [isFormDeleting, setIsFormDeleting] = useState(false)
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. After publishing, you will be unable
						to edit this form.
						<br />
						<span className="font-medium">
							Once published, this form will be made available to public and you
							will be able to collect submissions.
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isFormDeleting}
						onClick={(e) => {
							e.preventDefault()
							deleteForm()
						}}>
						{isFormDeleting && (
							<ImSpinner2 className="animate-spin h-6 w-6 mr-2" />
						)}
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default FormDelete
