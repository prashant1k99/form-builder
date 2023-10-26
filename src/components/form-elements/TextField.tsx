import { MdTextFields } from 'react-icons/md'
import { ElementsType, FormElement, FormElementInstance } from '../FormElements'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import z from 'zod'
import { useForm } from 'react-hook-form'

const type: ElementsType = 'TextField'

const extraAttributes = {
	label: 'Text Field',
	placeholder: 'Placeholder',
	helperText: 'Helper Text',
	required: false,
}

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	placeholder: z.string().max(50),
	helperText: z.string().max(100),
	required: z.boolean().default(false),
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

	formComponent: () => {
		return (
			<div className="flex flex-col gap-2">
				<label htmlFor="text-field-label">Label</label>
				<input type="text" id="text-field-label" />
			</div>
		)
	},

	propertiesComponent: PropertiesComponent,
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
			<Label>
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
	const { label, helperText, placeholder, required } = element.extraAttributes

	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onChange',
		defaultValues: {
			label,
			placeholder,
			helperText,
			required,
		},
	})
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label>
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
