import { BiCloudUpload } from 'react-icons/bi'
import { Button } from '../ui/button'
import useDesigner from '@/hooks/useDesigner'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { useState } from 'react'
import Forms from '@/data/forms'
import { toast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'
import { Form } from '@/types/forms'
import { updateActiveForm } from '@/state/form'
import { ImSpinner2 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'
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
} from '@/components/ui/alert-dialog'

function PublishBtn() {
	const [isPublishing, setIsPublishing] = useState(false)
	const form = useAppSelector((state) => state.forms.activeForm)
	const { elements } = useDesigner()
	const dispatch = useAppDispatch()
	const updateForm = (form: Form) => dispatch(updateActiveForm(form))
	const navigate = useNavigate()

	const saveForm = () => {
		if (isPublishing) return
		if (!form) return
		setIsPublishing(true)
		Forms.updateForm(form.id, {
			...form,
			fields: elements,
			state: 'published',
		})
			.then(() => {
				updateForm({
					...form,
					fields: elements,
					state: 'published',
				})
				setIsPublishing(false)
				toast({
					title: 'Form published.',
					description: 'Your form has been published.',
				})
				setTimeout(() => {
					navigate(`/data/${form.id}?landingFirst=true`)
				}, 1000)
			})
			.catch((error) => {
				setIsPublishing(false)
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description:
						error instanceof Error
							? error.message
							: 'An unknown error occurred.',
					action: (
						<ToastAction
							altText="Try again"
							onClick={(e) => {
								e.preventDefault()
								saveForm()
							}}>
							Try again
						</ToastAction>
					),
				})
			})
	}

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={'default'}>
					<BiCloudUpload className="h-6 w-6 mr-2" />
					Publish
				</Button>
			</AlertDialogTrigger>
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
						disabled={isPublishing}
						onClick={(e) => {
							e.preventDefault()
							saveForm()
						}}>
						{isPublishing && (
							<ImSpinner2 className="animate-spin h-6 w-6 mr-2" />
						)}
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export default PublishBtn
