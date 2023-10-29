import { Button } from '../ui/button'
import { BiSolidSave } from 'react-icons/bi'
import useDesigner from '@/hooks/useDesigner'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { useState } from 'react'
import Forms from '@/data/forms'
import { toast } from '../ui/use-toast'
import { ToastAction } from '../ui/toast'
import { Form } from '@/types/forms'
import { updateActiveForm } from '@/state/form'
import { ImSpinner2 } from 'react-icons/im'

function FormSaveBtn() {
	const [isSaving, setIsSaving] = useState(false)
	const form = useAppSelector((state) => state.forms.activeForm)
	const { elements } = useDesigner()
	const dispatch = useAppDispatch()
	const updateForm = (form: Form) => dispatch(updateActiveForm(form))

	const saveForm = () => {
		if (isSaving) return
		if (!form) return
		setIsSaving(true)
		Forms.updateForm(form.id, {
			...form,
			fields: elements,
		})
			.then(() => {
				updateForm({
					...form,
					fields: elements,
				})
				setIsSaving(false)
				toast({
					title: 'Form saved.',
					description: 'Your form has been saved.',
				})
			})
			.catch((error) => {
				setIsSaving(false)
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

	const hasAnyChanges = () => {
		if (!form) return false
		if (JSON.stringify(form.fields) !== JSON.stringify(elements)) return true
		return false
	}

	return (
		<Button
			variant={'ghost'}
			disabled={isSaving || !hasAnyChanges()}
			onClick={(e) => {
				e.preventDefault()
				saveForm()
			}}>
			{isSaving ? (
				<ImSpinner2 className="animate-spin h-6 w-6 mr-2" />
			) : (
				<BiSolidSave className="h-6 w-6 mr-2" />
			)}
			Save
		</Button>
	)
}

export default FormSaveBtn
