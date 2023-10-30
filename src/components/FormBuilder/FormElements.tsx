import React from 'react'

import { TextFieldFormElement } from '../form-elements/TextField'
import { TitleFieldFormElement } from '../form-elements/TitleField'

export type ElementsType = 'TextField' | 'TitleField'
export type SubmitFunction = (key: string, value: string) => void

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
		submitValue?: SubmitFunction
		isInvalid?: string | boolean
		defaultValue?: any
	}>
	propertiesComponent: React.FC<{
		elementInstance: FormElementInstance
	}>

	validate: (
		element: FormElementInstance,
		currentValue: string
	) => string | boolean
}

type FormElementsType = {
	[key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
	TextField: TextFieldFormElement,
	TitleField: TitleFieldFormElement,
}
