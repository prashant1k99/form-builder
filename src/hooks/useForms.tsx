import { FormElementInstance } from '@/components/FormBuilder/FormElements'
import { ToastAction } from '@/components/ui/toast'
import { toast } from '@/components/ui/use-toast'
import Forms from '@/data/forms'
import { Form } from '@/types/forms'
import { useEffect, useState } from 'react'

export default function useForms() {
	const [form, setFormData] = useState<Form | null>(null)
	const [isSaving, setIsSaving] = useState(false)

	useEffect(() => {
		console.log('form changed', form)
	}, [form])

	const saveForm = ({
		form,
		elements,
	}: {
		form: Form
		elements?: FormElementInstance[]
	}) => {
		console.log('saving form', form, elements)
		if (isSaving) return
		if (!form) return
		setIsSaving(true)
		console.log('Init')
		Forms.updateForm(form.id, {
			...form,
			fields: elements,
		})
			.then(() => {
				setIsSaving(false)
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
								saveForm({
									form,
									elements,
								})
							}}>
							Try again
						</ToastAction>
					),
				})
			})
	}

	const setForm = (form: Form) => {
		setFormData((prev) => {
			console.log(
				`setting form: prev => ${JSON.stringify(prev)}, new => ${JSON.stringify(
					form
				)}`
			)
			return form
		})
	}

	return { form, isSaving, setForm, saveForm }
}
