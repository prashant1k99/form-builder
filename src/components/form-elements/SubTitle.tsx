import { LuHeading3 } from 'react-icons/lu'
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

const type: ElementsType = 'SubTitleField'

const extraAttributes = {
	subTitle: 'SubTitle',
}

const propertiesSchema = z.object({
	subTitle: z.string().min(2).max(100),
})

export const SubTitleFieldFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
			extraAttributes,
		}
	},

	designerBtnElement: {
		icon: LuHeading3,
		label: 'SubTitle Field',
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
	const { subTitle } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full pb-2">
			<Label className="text-muted-foreground">SubTitle field</Label>
			<p className="text-lg">{subTitle}</p>
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
	const { subTitle } = element.extraAttributes

	const form = useForm<propertiesFormSchemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onBlur',
		defaultValues: {
			subTitle,
		},
	})

	useEffect(() => {
		form.reset(element.extraAttributes)
	}, [element, form])

	function applyChanges(data: propertiesFormSchemaType) {
		const { subTitle } = data
		updateElement(element.id, {
			...element,
			extraAttributes: {
				subTitle,
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
					name="subTitle"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Sub Title</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Enter Sub Title"
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
	const { subTitle } = element.extraAttributes
	return (
		<div className="flex flex-col gap-2 w-full pb-2">
			<p className="text-lg">{subTitle}</p>
		</div>
	)
}
