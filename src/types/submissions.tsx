export type SubmissionData = {
	[key: string]: string | number | boolean
}

export type SubmissionMeta = {
	ip?: string
	userAgent?: string
	fingerprint?: string
}

export type SubmissionModify = {
	formId?: string
	data?: SubmissionData
	meta?: SubmissionMeta
}

export type Submission = {
	id: string
	formId: string
	data: SubmissionData
	createdAt: number
	meta?: SubmissionMeta
}
