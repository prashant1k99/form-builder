import { MdTextFields } from 'react-icons/md'
import {
	ElementsType,
	FormElement,
	FormElementInstance,
	SubmitFunction,
} from '../FormBuilder/FormElements'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import z from 'zod'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import useDesigner from '@/hooks/useDesigner'
import {
	Form,
	FormControl,
	FormDescription,
	FormLabel,
	FormItem,
	FormField,
	FormMessage,
} from '../ui/form'
import { Switch } from '../ui/switch'
import { cn } from '@/lib/utils'

const type: ElementsType = 'TextField'

const extraAttributes = {
	label: 'Text Field',
	placeholder: 'Placeholder',
	helperText: 'Helper Text',
	required: false,
	minLettersCount: '0',
	maxLetterCount: '50',
}

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	placeholder: z.string().max(50),
	helperText: z.string().max(100),
	required: z.boolean().default(false),
	minLettersCount: z.string().default('0'),
	maxLetterCount: z.string().default('50'),
	regex: z.string().max(100).optional(),
})

export const TextFieldFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
			extraAttributes,
		}
	},

	designerBtnElement: {
		icon: MdTextFields,
		label: 'Text Field',
	},

	designerComponent: DesignerComponent,

	formComponent: FormComponent,

	propertiesComponent: PropertiesComponent,

	validate: (
		element: FormElementInstance,
		currentValue: string
	): string | boolean => {
		const elementInstance = element as CustomInstance

		const {
			minLettersCount = '0',
			maxLetterCount = '50',
			required,
		} = elementInstance.extraAttributes
		if (required && currentValue == '') return 'This field is required'
		if (regex && !new RegExp(regex).test(currentValue))
			return 'This field is invalid'
		if (maxLetterCount && currentValue.length > parseInt(maxLetterCount)) {
			return `This field can have a maximum of ${maxLetterCount} letters`
		}
		if (minLettersCount && currentValue.length < parseInt(minLettersCount)) {
			return `This field must have a minimum of ${minLettersCount} letters`
		}
		return true
	},
}

type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes
}

function DesignerComponent({
	elementInstance,
}: {
	elementInstance: FormElementInstance
}) {
	const element = elementInstance as CustomInstance
	const { label, helperText, placeholder, required } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">
				{label}
				{required && <span className="text-red-500 pl-1">*</span>}
			</Label>
			<Input readOnly disabled placeholder={placeholder} />
			{helperText && (
				<p className="text-xs text-muted-foreground">{helperText}</p>
			)}
		</div>
	)
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

function PropertiesComponent({
	elementInstance,
}: {
	elementInstance: FormElementInstance
}) {
	const element = elementInstance as CustomInstance
	const { updateElement } = useDesigner()
	const {
		label,
		helperText,
		placeholder,
		required,
		minLettersCount,
		maxLetterCount,
		regex,
	} = element.extraAttributes

	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onBlur',
		defaultValues: {
			label,
			placeholder,
			helperText,
			required,
			minLettersCount,
			maxLetterCount,
			regex,
		},
	})

	useEffect(() => {
		form.reset(element.extraAttributes)
	}, [element, form])

	function applyChanges(data: propertiesFormSchemaType) {
		const {
			label,
			placeholder,
			helperText,
			required,
			minLettersCount,
			maxLetterCount,
			regex,
		} = data
		console.log(data)
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				placeholder,
				helperText,
				required,
				minLettersCount,
				maxLetterCount,
				regex,
			},
		})
	}

	const Properties = [
		{
			label: 'Label',
			description:
				'The label of the text field. It will be displayed above field.',
			input: (field: ControllerRenderProps) => (
				<Input
					{...field}
					placeholder="Label"
					onKeyDown={(e) => {
						if (e.key == 'Enter') (e.target as HTMLInputElement).blur()
					}}
				/>
			),
			name: 'label',
		},
		{
			label: 'Placeholder',
			description: 'The placeholder of the text field.',
			name: 'placeholder',
		},
		{
			label: 'Helper Text',
			description: 'The helper text of the text field.',
			name: 'helperText',
		},
		{
			label: 'Min Letters',
			description: 'The minimum number of letters allowed in the text field.',
			name: 'minLettersCount',
			input: (field: ControllerRenderProps) => (
				<Input
					{...field}
					value={field.value || 0}
					type="number"
					min={0}
					max={10}
					onKeyDown={(e) => {
						if (e.key == 'Enter') (e.target as HTMLInputElement).blur()
					}}
				/>
			),
		},
		{
			label: 'Max Letters',
			description: 'The maximum number of letters allowed in the text field.',
			name: 'maxLetterCount',
			input: (field: ControllerRenderProps) => (
				<Input
					{...field}
					value={field.value || 50}
					type="number"
					min={10}
					max={50}
					onKeyDown={(e) => {
						if (e.key == 'Enter') (e.target as HTMLInputElement).blur()
					}}
				/>
			),
		},
		{
			label: 'Regex Validation',
			description: 'The regex validation of the text field.',
			name: 'regex',
		},
	]

	return (
		<Form {...form}>
			<form
				onBlur={form.handleSubmit(applyChanges)}
				className="space-y-3"
				onSubmit={(e) => e.preventDefault()}>
				{Properties.map((property) => {
					return (
						<FormField
							key={property.label}
							control={form.control}
							name={
								property.name as
									| 'label'
									| 'placeholder'
									| 'helperText'
									| 'minLettersCount'
									| 'maxLetterCount'
							}
							render={({ field }) => (
								<FormItem>
									<FormLabel>{property.label}</FormLabel>
									<FormControl>
										{property.input ? (
											property.input({ ...field, name: property.name })
										) : (
											<Input
												{...field}
												placeholder={property.label}
												onKeyDown={(e) => {
													if (e.key == 'Enter')
														(e.target as HTMLInputElement).blur()
												}}
											/>
										)}
									</FormControl>
									<FormDescription>{property.description}</FormDescription>
								</FormItem>
							)}
						/>
					)
				})}
				<FormField
					control={form.control}
					name="required"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Required</FormLabel>
								<FormDescription>
									The helper text of the field. <br />
									It will be displayed below the field.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

function FormComponent({
	elementInstance,
	submitValue,
	isInvalid,
	defaultValue,
}: {
	elementInstance: FormElementInstance
	submitValue?: SubmitFunction
	isInvalid?: string | boolean
	defaultValue?: any
}) {
	const element = elementInstance as CustomInstance

	const [value, setValue] = useState(defaultValue || '')
	const [error, setError] = useState<boolean | string>(false)

	useEffect(() => {
		console.log('Invalid', isInvalid)
		if (isInvalid === false) setError(false)
		setError(isInvalid || false)
	}, [isInvalid])

	const { label, helperText, placeholder, required } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className={cn(error && 'text-red-500')}>
				{label}
				{required && <span className="text-red-500 pl-1">*</span>}
			</Label>
			<Input
				className={cn(error && 'text-red-500 ring-2 ring-red-500')}
				onChange={(e) => setValue(e.target.value)}
				placeholder={placeholder}
				required={required}
				onBlur={(e) => {
					if (!submitValue) return

					const isValid = TextFieldFormElement.validate(element, e.target.value)
					if (isValid == true) setError(false)
					else setError(isValid)

					if (!isValid) return
					submitValue(element.id, e.target.value)
				}}
				value={value}
			/>
			<div>
				{helperText && (
					<p
						className={cn(
							'text-xs text-muted-foreground',
							error && 'text-red-500'
						)}>
						{helperText}
					</p>
				)}
				<p
					className={cn(
						'text-xs text-red-500 opacity-0 transition-opacity duration-300',
						error && 'opacity-100'
					)}>
					{error || 'No error'}
				</p>
			</div>
		</div>
	)
}
