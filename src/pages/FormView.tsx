import { fetchForm } from '@/state/form'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Form } from '@/types/forms'
import { useAppDispatch } from '@/hooks/reduxHooks'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '@/components/Loader'
import {
	FormElementInstance,
	FormElements,
} from '@/components/FormBuilder/FormElements'
import { Button } from '@/components/ui/button'
import { TbHandClick } from 'react-icons/tb'
import { ImSpinner2 } from 'react-icons/im'
import { toast } from '@/components/ui/use-toast'
import { createSubmission } from '@/state/submissions'

function FormView() {
	const { id } = useParams<{ id: string }>()
	const [form, setForm] = useState<Form | null>(null)
	const [loading, setLoading] = useState(true)
	const [formSubmitted, setFormSubmitted] = useState(false)
	const [isFormSubmitting, setIsFormSubmitting] = useState(false)
	const [randerKey, setRanderKey] = useState(new Date().getTime())
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const formValues = useRef<{ [key: string]: string }>({})
	const formErrors = useRef<{ [key: string]: string | boolean }>({})

	const validateForm: () => boolean = useCallback(() => {
		if (!form || !form.fields || form.fields.length <= 0) return false
		console.log(form.fields)
		for (const field of form.fields as FormElementInstance[]) {
			const actualValue = formValues.current[field.id] || ''
			const valid = FormElements[field.type].validate(field, actualValue)

			console.log('Valid', field.id, valid)
			// FormElements[field.type].getErrorMessage(field)
			if (valid != true) {
				formErrors.current[field.id] = valid
			} else {
				delete formErrors.current[field.id]
			}
		}

		if (Object.keys(formErrors.current).length > 0) return false
		return true
	}, [form?.fields])

	const submitValue = (id: string, value: string) => {
		formValues.current[id] = value
	}

	const handleSubmit = () => {
		console.log('Form values', formValues.current)

		// TODO: Handle form submission
		if (!form) return
		const validForm = validateForm()
		if (!validForm) {
			setRanderKey(new Date().getTime())
			return
		}
		setIsFormSubmitting(true)

		dispatch(
			createSubmission({
				formId: form.id,
				submission: formValues.current,
			})
		).catch((error) => {
			console.error(error)
			toast({
				title: 'Failed to submit form',
				description: 'Please try again later',
				variant: 'destructive',
			})
		})

		if (form.extraConfig?.action.type === 'redirect') {
			window.location.replace(form.extraConfig.action.url)
		}
		setFormSubmitted(true)
		setIsFormSubmitting(false)
	}

	const handleFormComplete = () => {
		console.log('Take actions based on the conditions')
		if (!form) return
		if (form.extraConfig?.submitButton?.action === 'redirect') {
			window.location.replace(form.extraConfig.submitButton.url)
		}
	}

	useEffect(() => {
		setLoading(true)
		dispatch(
			fetchForm({
				formId: id as string,
			})
		)
			.then((action) => {
				const form = action.payload as Form
				if (!form) navigate(`/not-found`)
				console.log(form)
				setForm(form)
			})
			.catch((error) => {
				console.error(error)
				navigate(`/not-found`)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [id])

	return (
		<div className="h-full w-full flex justify-center items-center">
			{loading && !form && <Loader />}
			{form && !formSubmitted && (
				<div className="bg-accent flex flex-col flex-grow items-center justify-center p-4 overflow-y-auto overflow-x-hidden max-w-[600px] m-auto gap-4 h-fit w-full rounded-2xl">
					<div key={randerKey} className="flex flex-col w-full gap-4 m-3">
						{form.fields?.map((element) => {
							const ElementComponent = FormElements[element.type].formComponent
							return (
								<ElementComponent
									key={element.id}
									elementInstance={element}
									submitValue={submitValue}
									defaultValue={formValues.current[element.id]}
									isInvalid={
										formErrors.current[element.id]
											? formErrors.current[element.id]
											: false
									}
								/>
							)
						})}
						<Button
							className="w-full"
							disabled={isFormSubmitting}
							onClick={(e) => {
								e.preventDefault()
								handleSubmit()
							}}>
							{isFormSubmitting ? (
								<ImSpinner2 className="animate-spin h-6 w-6 mr-2" />
							) : (
								<TbHandClick className="h-6 w-6 mr-2" />
							)}
							{form.extraConfig?.submitButton?.text || 'Submit'}
						</Button>
					</div>
				</div>
			)}
			{form && formSubmitted && (
				<div className="flex flex-col gap-4 items-center">
					<h1 className="text-3xl">
						{form.extraConfig?.confirmationMessage?.text ||
							'Form submitted successfully'}
					</h1>
					<p className="">
						{form.extraConfig?.confirmationMessage?.subText ||
							'Your form has been submitted successfully. Thank you for your time.'}
					</p>
					{form.extraConfig?.submitButton?.action === 'redirect' && (
						<Button
							onClick={(e) => {
								e.preventDefault()
								handleFormComplete
							}}>
							<TbHandClick className="h-6 w-6 mr-2" />
							{form.extraConfig?.submitButton?.text || 'Close'}
						</Button>
					)}
				</div>
			)}
		</div>
	)
}

export default FormView
