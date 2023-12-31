import { LuHeading1 } from 'react-icons/lu'
import {
	ElementsType,
	FormElement,
	FormElementInstance,
} from '../FormBuilder/FormElements'
import { Input } from '../ui/input'
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

const type: ElementsType = 'TitleField'

const extraAttributes = {
	title: 'Title',
}

const propertiesSchema = z.object({
	title: z.string().min(2).max(50),
})

export const TitleFieldFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
			extraAttributes,
		}
	},

	designerBtnElement: {
		icon: LuHeading1,
		label: 'Title Field',
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
	const { title } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full">
			<Label className="text-muted-foreground">Title field</Label>
			<h1 className="text-3xl">{title}</h1>
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
	const { title } = element.extraAttributes

	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onBlur',
		defaultValues: {
			title,
		},
	})

	useEffect(() => {
		form.reset(element.extraAttributes)
	}, [element, form])

	function applyChanges(data: propertiesFormSchemaType) {
		const { title } = data
		updateElement(element.id, {
			...element,
			extraAttributes: {
				title,
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
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter Title"
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
	const { title } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full">
			<h1 className="text-3xl">{title}</h1>
		</div>
	)
}
