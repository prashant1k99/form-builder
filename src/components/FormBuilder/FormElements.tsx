import React from 'react'

import { TextFieldFormElement } from '../form-elements/TextField'
import { TitleFieldFormElement } from '../form-elements/TitleField'
import { SubTitleFieldFormElement } from '../form-elements/SubTitle'
import { ParagraphFormElement } from '../form-elements/Paragraph'
import { SeparatorFormElement } from '../form-elements/Separator'
import { TextAreaFormElement } from '../form-elements/TextArea'
import { PhoneNumberFormElement } from '../form-elements/PhoneNumberField'
import { NumberFieldFormElement } from '../form-elements/NumberField'
import { EmailFieldFormElement } from '../form-elements/EmailField'
import { CheckBoxFieldFormElement } from '../form-elements/CheckBoxField'
import { SelectFieldFormElement } from '../form-elements/SelectField'
import { DateFieldFormElement } from '../form-elements/DateField'
import { RadioGroupFieldFormElement } from '../form-elements/RadioGroupField'

export type ElementsType =
	| 'TextField'
	| 'TitleField'
	| 'SubTitleField'
	| 'Paragraph'
	| 'Separator'
	| 'TextArea'
	| 'PhoneNumberField'
	| 'NumberField'
	| 'EmailField'
	| 'CheckBoxField'
	| 'SelectField'
	| 'DateField'
	| 'RadioGroupField'
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
	SubTitleField: SubTitleFieldFormElement,
	Paragraph: ParagraphFormElement,
	Separator: SeparatorFormElement,
	TextArea: TextAreaFormElement,
	PhoneNumberField: PhoneNumberFormElement,
	NumberField: NumberFieldFormElement,
	EmailField: EmailFieldFormElement,
	CheckBoxField: CheckBoxFieldFormElement,
	SelectField: SelectFieldFormElement,
	DateField: DateFieldFormElement,
	RadioGroupField: RadioGroupFieldFormElement,
}
