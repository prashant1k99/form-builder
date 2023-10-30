import { FormElementInstance } from '@/components/FormBuilder/FormElements'

type FormExtraConfig = {
	submitButton?: {
		text: string
		color: string
		textColor: string
		action: 'nothing' | 'redirect'
		url: string
	}
	confirmationMessage?: {
		text: string
		subText: string
		color: string
		textColor: string
	}
	action: {
		type: 'redirect' | 'thankYouPage'
		url: string
	}
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
	createdAt: number
	updatedAt: number
}

export type ModifyForm = {
	name?: string
	state?: FormState
	description?: string
	fields?: FormElementInstance[]
	extraConfig?: FormExtraConfig
	userId?: string
	createdAt?: number
}
