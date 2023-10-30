import { RiPageSeparator } from 'react-icons/ri'
import { ElementsType, FormElement } from '../FormBuilder/FormElements'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'

const type: ElementsType = 'Separator'

export const SeparatorFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
		}
	},

	designerBtnElement: {
		icon: RiPageSeparator,
		label: 'Separator',
	},

	designerComponent: DesignerComponent,

	formComponent: FormComponent,

	propertiesComponent: PropertiesComponent,

	validate: () => true,
}

function DesignerComponent() {
	return (
		<div className="flex flex-col gap-2 w-full pb-2">
			<Label className="text-muted-foreground">Separator</Label>
			<Separator />
		</div>
	)
}

function PropertiesComponent() {
	return <p className="">No Properties for this component</p>
}

function FormComponent() {
	return (
		<div className="flex flex-col gap-2 w-full pb-2">
			<Separator />
		</div>
	)
}
