import { Form as TForm } from '@/types/forms'
import z from 'zod'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setOrUpdateActiveForm, updateActiveFormHasChanges } from '@/state/form'
import {
	Form,
	FormControl,
	FormDescription,
	FormLabel,
	FormItem,
	FormField,
} from './ui/form'
import { useEffect, useMemo } from 'react'
import { Input } from './ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select'

const formSettingsSchema = z.object({
	name: z.string().min(2).max(50),
	description: z.string().max(100),
	submitButtonText: z.string().max(50),
	submitButtonAction: z.enum(['nothing', 'redirect']),
	submitButtonUrl: z.string().max(100).optional(),
	confirmationMessageText: z.string().max(50).optional(),
	confirmationMessageSubText: z.string().max(100).optional(),
	postConfirmationRedirectUrl: z.string().max(100).optional(),
})

type propertiesFormSettingsSchema = z.infer<typeof formSettingsSchema>

function FormSettings() {
	const form = useAppSelector((state) => state.forms.activeForm) as TForm
	const dispatch = useAppDispatch()

	const defaultValues = {
		name: form.name,
		description: form.description,
		submitButtonText: form.extraConfig?.submitButton?.text || 'Submit',
		submitButtonAction: form.extraConfig?.submitButton?.action || 'nothing',
		submitButtonUrl: form.extraConfig?.submitButton?.url || '',
		confirmationMessageText:
			form.extraConfig?.confirmationMessage?.text ||
			'Form submitted successfully',
		confirmationMessageSubText:
			form.extraConfig?.confirmationMessage?.subText ||
			'Your form has been submitted successfully. Thank you for your time.',
		postConfirmationRedirectUrl: form.extraConfig?.action?.url || '',
	}

	const formResolver = useForm<propertiesFormSettingsSchema>({
		resolver: zodResolver(formSettingsSchema),
		mode: 'onBlur',
		defaultValues: defaultValues,
	})

	useMemo(() => {
		if (!form) return <div>No Form Selected</div>
	}, [form])

	useEffect(() => {
		formResolver.reset(defaultValues)
	}, [form])

	const applyChanges = (data: propertiesFormSettingsSchema) => {
		dispatch(
			setOrUpdateActiveForm({
				...form,
				name: data.name,
				description: data.description,
				extraConfig: {
					submitButton: {
						text: data.submitButtonText,
						action: data.submitButtonAction,
						url: data.submitButtonUrl,
					},
					confirmationMessage: {
						text: data.confirmationMessageText,
						subText: data.confirmationMessageSubText,
					},
					action: {
						url: data.postConfirmationRedirectUrl,
					},
				},
			})
		)
		dispatch(updateActiveFormHasChanges(true))
	}

	const formSettingProperties = [
		{
			label: 'Form Name',
			name: 'name',
		},
		{
			label: 'Form Description',
			name: 'description',
		},
		{
			label: 'Submit Button Text',
			name: 'submitButtonText',
			description: 'The text that will be displayed on the submit button.',
		},
		{
			label: 'Submit Button Action',
			name: 'submitButtonAction',
			input: (field: ControllerRenderProps) => (
				<Select {...field} onValueChange={field.onChange} value={field.value}>
					<SelectTrigger>
						<SelectValue placeholder="Submit Button Action" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="nothing">Show Thank You Page</SelectItem>
						<SelectItem value="redirect">Redirect</SelectItem>
					</SelectContent>
				</Select>
			),
			description:
				'The action that will be performed when the submit button is clicked.',
		},
		{
			label: 'Submit Button URL',
			name: 'submitButtonUrl',
			isHidden: formResolver.watch('submitButtonAction') !== 'redirect',
			required: formResolver.watch('submitButtonAction') === 'redirect',
			description:
				'The URL that the user will be redirected to when the form is submitted successfully',
		},
		{
			label: 'Confirmation Message Text',
			name: 'confirmationMessageText',
			isHidden: formResolver.watch('submitButtonAction') === 'redirect',
			description:
				'The text that will be displayed when the form is submitted successfully.',
		},
		{
			label: 'Confirmation Message Sub Text',
			name: 'confirmationMessageSubText',
			isHidden: formResolver.watch('submitButtonAction') === 'redirect',
			description:
				'The sub text that will be displayed when the form is submitted successfully.',
		},
		{
			label: 'Post Confirmation Redirect URL',
			name: 'postConfirmationRedirectUrl',
			isHidden: formResolver.watch('submitButtonAction') === 'redirect',
			required: formResolver.watch('submitButtonAction') !== 'redirect',
			description:
				'The URL that the user will be redirected to after the form is submitted successfully.',
		},
	]

	return (
		<div className="w-full">
			<Form {...formResolver}>
				<form
					onBlur={formResolver.handleSubmit(applyChanges)}
					className="space-y-3"
					onSubmit={(e) => e.preventDefault()}>
					{formSettingProperties.map((property) => {
						if (property.isHidden) return null
						return (
							<FormField
								key={property.label}
								control={formResolver.control}
								name={
									property.name as
										| 'name'
										| 'description'
										| 'submitButtonText'
										| 'submitButtonAction'
										| 'submitButtonUrl'
										| 'confirmationMessageText'
										| 'confirmationMessageSubText'
										| 'postConfirmationRedirectUrl'
								}
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											{property.label}
											{property.required && (
												<span className="text-red-500 pl-1">*</span>
											)}
										</FormLabel>
										<FormControl>
											{property.input ? (
												property.input({ ...field, name: property.name })
											) : (
												<Input
													{...field}
													required={property.required}
													placeholder={property.label}
													onKeyDown={(e) => {
														if (e.key == 'Enter')
															(e.target as HTMLInputElement).blur()
													}}
												/>
											)}
										</FormControl>
										{property.description && (
											<FormDescription>{property.description}</FormDescription>
										)}
									</FormItem>
								)}
							/>
						)
					})}
				</form>
			</Form>
		</div>
	)
}

export default FormSettings
