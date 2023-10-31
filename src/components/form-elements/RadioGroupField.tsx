import { BsUiRadios } from 'react-icons/bs'
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
import { Button } from '../ui/button'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { Separator } from '../ui/separator'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

const type: ElementsType = 'RadioGroupField'

const extraAttributes = {
	label: 'Radio Group Field',
	helperText: 'Helper Text',
	required: false,
	options: ['Add Options'] as string[],
}

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(100),
	required: z.boolean().default(false),
	options: z.array(z.string()).default([]),
})

export const RadioGroupFieldFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
			extraAttributes,
		}
	},

	designerBtnElement: {
		icon: BsUiRadios,
		label: 'Radio Group Field',
	},

	designerComponent: DesignerComponent,

	formComponent: FormComponent,

	propertiesComponent: PropertiesComponent,

	validate: (
		element: FormElementInstance,
		currentValue: string
	): string | boolean => {
		const elementInstance = element as CustomInstance

		const { required, options } = elementInstance.extraAttributes
		if (required && currentValue.length < 0) return 'This field is required'
		if (required && !options.includes(currentValue))
			return 'Incorrect value selected'
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
	const { label, helperText, options, required } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full py-[1px]">
			<Label className="text-muted-foreground">
				{label}
				{required && <span className="text-red-500 pl-1">*</span>}
			</Label>
			<RadioGroup disabled defaultValue={options[0]}>
				{options.map((option, i) => {
					const id = `radio-${option}-${i}`
					return (
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="default" id={id} />
							<Label className="text-muted-foreground" htmlFor={id}>
								{option}
							</Label>
						</div>
					)
				})}
			</RadioGroup>
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
	const { label, helperText, required, options } = element.extraAttributes

	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onBlur',
		defaultValues: {
			label,
			helperText,
			required,
			options,
		},
	})

	useEffect(() => {
		form.reset(element.extraAttributes)
	}, [element, form])

	function applyChanges(data: propertiesFormSchemaType) {
		const { label, helperText, required, options } = data
		console.log(data)
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				required,
				options,
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
			label: 'Helper Text',
			description: 'The helper text of the text field.',
			name: 'helperText',
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
							name={property.name as 'label' | 'helperText'}
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
					name="options"
					render={({ field }) => (
						<FormItem>
							<div className="flex justify-between items-center">
								<FormLabel>Options</FormLabel>
								<Button
									variant={'outline'}
									className="gap-2"
									onClick={(e) => {
										e.preventDefault() // avoid submit
										form.setValue('options', field.value.concat('New option'))
									}}>
									<AiOutlinePlus />
									Add Option
								</Button>
							</div>
							<div className="flex flex-col gap-2">
								{form.watch('options').map((option, index) => (
									<div
										key={index}
										className="flex items-center justify-between gap-1">
										<Input
											placeholder=""
											value={option}
											onChange={(e) => {
												field.value[index] = e.target.value
												field.onChange(field.value)
											}}
										/>
										<Button
											variant={'ghost'}
											size={'icon'}
											disabled={field.value.length <= 1}
											onClick={(e) => {
												e.preventDefault()
												const newOptions = [...field.value]
												newOptions.splice(index, 1)
												field.onChange(newOptions)
											}}>
											<AiOutlineClose />
										</Button>
									</div>
								))}
							</div>

							<FormDescription>
								The helper text of the field. <br />
								It will be displayed below the field.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator />
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

	const { label, helperText, required, options } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className={cn(error && 'text-red-500')}>
				{label}
				{required && <span className="text-red-500 pl-1">*</span>}
			</Label>
			<RadioGroup
				defaultValue={value}
				onValueChange={(value) => {
					setValue(value)
					if (!submitValue) return
					const valid = RadioGroupFieldFormElement.validate(element, value)
					setError(!valid)
					submitValue(element.id, value)
				}}>
				{options.map((option, i) => {
					const id = `radio-${option}-${i}`
					return (
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="default" id={id} />
							<Label htmlFor={id}>{option}</Label>
						</div>
					)
				})}
			</RadioGroup>
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
