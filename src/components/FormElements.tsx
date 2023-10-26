import React from 'react'

import { TextFieldFormElement } from './form-elements/TextField'

export type ElementsType = 'TextField'

export type FormElementInstance = {
	id: string
	type: ElementsType
	extraAttributes?: Record<string, unknown>
}

export type FormElement = {
	type: ElementsType

	construct: (id: string) => FormElementInstance

	designerBtnElement: {
		icon: React.ElementType
		label: string
	}

	designerComponent: React.FC
	formComponent: React.FC
	propertiesComponent: React.FC
}

type FormElementsType = {
	[key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
	TextField: TextFieldFormElement,
}
