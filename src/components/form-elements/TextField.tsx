import { MdTextFields } from 'react-icons/md'
import { ElementsType, FormElement } from '../FormElements'

const type: ElementsType = 'TextField'

export const TextFieldFormElement: FormElement = {
	type,

	construct: (id: string) => {
		return {
			id,
			type,
			extraAttributes: {
				label: 'Label',
				placeholder: 'Placeholder',
				helperText: 'Helper Text',
				required: false,
			},
		}
	},

	designerBtnElement: {
		icon: MdTextFields,
		label: 'Text Field',
	},

	designerComponent: () => {
		return (
			<div className="text-white">Designer Componenet</div>
			// <div className="flex flex-col gap-2">
			// 	<label htmlFor="text-field-label">Label</label>
			// 	<input type="text" id="text-field-label" />
			// </div>
		)
	},

	formComponent: () => {
		return (
			<div className="flex flex-col gap-2">
				<label htmlFor="text-field-label">Label</label>
				<input type="text" id="text-field-label" />
			</div>
		)
	},

	propertiesComponent: () => {
		return (
			<div className="flex flex-col gap-2">
				<label htmlFor="text-field-label">Label</label>
				<input type="text" id="text-field-label" />
			</div>
		)
	},
}
