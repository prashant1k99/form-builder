import { FormElementInstance } from '@/components/FormElements'

type FormExtraConfig = {
	allowMultipleSubmissions?: boolean
	allowAnonymousSubmissions?: boolean
	allowEditAfterSubmit?: boolean
	submitButtonText?: string
	submitButtonColor?: string
	submitButtonTextColor?: string
	submitButtonIcon?: string
	confirmationMessage?: string
	confirmationMessageColor?: string
	confirmationMessageTextColor?: string
	formStyle?: string
}

type FormState = 'published' | 'draft'

export type Form = {
	id: string
	name: string
	state: FormState
	description?: string
	fields?: FormElementInstance[]
	extraConfig?: FormExtraConfig
	userId: string
	createdAt: Date
	updatedAt: Date
}

export type ModifyForm = {
	name?: string
	state?: FormState
	description?: string
	fields?: FormElementInstance[]
	extraConfig?: FormExtraConfig
}