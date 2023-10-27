import React from 'react'

import { TextFieldFormElement } from './form-elements/TextField'

export type ElementsType = 'TextField'

export type FormElementInstance = {
	id: string
	type: ElementsType
	/* trunk-ignore(eslint/@typescript-eslint/no-explicit-any) */
	extraAttributes?: Record<string, any>
}

export type FormElement = {
	type: ElementsType

	construct: (id: string) => FormElementInstance

	designerBtnElement: {
		icon: React.ElementType
		label: string
	}

	designerComponent: React.FC<{
		elementInstance: FormElementInstance
	}>
	formComponent: React.FC<{
		elementInstance: FormElementInstance
	}>
	propertiesComponent: React.FC<{
		elementInstance: FormElementInstance
	}>
}

type FormElementsType = {
	[key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
	TextField: TextFieldFormElement,
}
