import { BsTextParagraph } from 'react-icons/bs'
import {
	ElementsType,
	FormElement,
	FormElementInstance,
} from '../FormBuilder/FormElements'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import useDesigner from '@/hooks/useDesigner'
import {
	Form,
	FormControl,
	FormLabel,
	FormItem,
	FormField,
	FormMessage,
} from '../ui/form'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

const type: ElementsType = 'Paragraph'

const extraAttributes = {
	text: 'Paragraph will be added',
}

const propertiesSchema = z.object({
	text: z.string().min(2).max(500),
})

export const ParagraphFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
			extraAttributes,
		}
	},

	designerBtnElement: {
		icon: BsTextParagraph,
		label: 'Paragraph Field',
	},

	designerComponent: DesignerComponent,

	formComponent: FormComponent,

	propertiesComponent: PropertiesComponent,

	validate: () => true,
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
	const { text } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full pb-2">
			<Label className="text-muted-foreground">Paragraph field</Label>
			<p>{text}</p>
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
	const { text } = element.extraAttributes

	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onBlur',
		defaultValues: {
			text,
		},
	})

	useEffect(() => {
		form.reset(element.extraAttributes)
	}, [element, form])

	function applyChanges(data: propertiesFormSchemaType) {
		const { text } = data
		updateElement(element.id, {
			...element,
			extraAttributes: {
				text,
			},
		})
	}

	return (
		<Form {...form}>
			<form
				onBlur={form.handleSubmit(applyChanges)}
				className="space-y-3"
				onSubmit={(e) => e.preventDefault()}>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Pragraph</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Enter Paragraph"
									onKeyDown={(e) => {
										if (e.key == 'Enter') (e.target as HTMLInputElement).blur()
									}}
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
}: {
	elementInstance: FormElementInstance
}) {
	const element = elementInstance as CustomInstance
	const { text } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full pb-2">
			<p>{text}</p>
		</div>
	)
}
