import { AiOutlineCheckSquare } from 'react-icons/ai'
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
import { Checkbox } from '@/components/ui/checkbox'

const type: ElementsType = 'CheckBoxField'

const extraAttributes = {
	label: 'CheckBox Field',
	helperText: 'Helper Text',
	required: false,
}

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(100),
	required: z.boolean().default(false),
})

export const CheckBoxFieldFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
			extraAttributes,
		}
	},

	designerBtnElement: {
		icon: AiOutlineCheckSquare,
		label: 'Check Box Field',
	},

	designerComponent: DesignerComponent,

	formComponent: FormComponent,

	propertiesComponent: PropertiesComponent,

	validate: (
		element: FormElementInstance,
		currentValue: string
	): string | boolean => {
		const elementInstance = element as CustomInstance

		const { required } = elementInstance.extraAttributes
		if (required && currentValue == '') return 'This field is required'
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
	const { label, helperText, required } = element.extraAttributes
	const id = `checkbox-${element.id}`
	return (
		<div className="flex flex-col gap-4 w-full">
			<Label className="text-muted-foreground">
				{label}
				{required && <span className="text-red-500 pl-1">*</span>}
			</Label>
			<div className="flex items-top space-x-2">
				<Checkbox id={id} />
				<div className="grid gap-1.5 leading-none">
					<Label htmlFor={id}>
						{label}
						{required && '*'}
					</Label>
					{helperText && (
						<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
					)}
				</div>
			</div>
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
	const { label, helperText, required } = element.extraAttributes

	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onBlur',
		defaultValues: {
			label,
			helperText,
			required,
		},
	})

	useEffect(() => {
		form.reset(element.extraAttributes)
	}, [element, form])

	function applyChanges(data: propertiesFormSchemaType) {
		const { label, helperText, required } = data
		console.log(data)
		updateElement(element.id, {
			...element,
			extraAttributes: {
				label,
				helperText,
				required,
			},
		})
	}

	const Properties = [
		{
			label: 'Label',
			description:
				'The label of the checkbox field. It will be displayed above field.',
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
			description: 'The helper text of the checkbox field.',
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
	defaultValue?: boolean
}) {
	const element = elementInstance as CustomInstance

	const [value, setValue] = useState(defaultValue || false)
	const [error, setError] = useState<boolean | string>(false)

	useEffect(() => {
		console.log('Invalid', isInvalid)
		if (isInvalid === false) setError(false)
		setError(isInvalid || false)
	}, [isInvalid])

	const { label, helperText, required } = element.extraAttributes
	const id = `checkbox-${element.id}`
	return (
		<div className="flex items-top space-x-2">
			<Checkbox
				id={id}
				checked={value}
				className={cn(error && 'border-red-500')}
				onCheckedChange={(checked) => {
					let value = false
					if (checked === true) value = true

					setValue(value)
					if (!submitValue) return
					const stringValue = value ? 'true' : 'false'
					const valid = CheckBoxFieldFormElement.validate(element, stringValue)
					setError(!valid)
					submitValue(element.id, stringValue)
				}}
			/>
			<div className="grid gap-1.5 leading-none">
				<Label htmlFor={id} className={cn(error && 'text-red-500')}>
					{label}
					{required && '*'}
				</Label>
				{helperText && (
					<p
						className={cn(
							'text-muted-foreground text-[0.8rem]',
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
