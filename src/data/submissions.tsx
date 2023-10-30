import { db } from '@/lib/firebase'
import {
	getDocs,
	collection,
	query,
	orderBy,
	where,
	limit,
	doc,
	startAfter,
	getDoc,
	serverTimestamp,
	addDoc,
	deleteDoc,
	Timestamp,
} from 'firebase/firestore'
import { Submission, SubmissionData, SubmissionMeta } from '@/types/submissions'

export default class Submissions {
	public static async getSubmissions({
		formId,
		limitDoc = 10,
		after,
	}: {
		formId: string
		limitDoc?: number
		after?: string | null
	}) {
		const submissions: Submission[] = []
		const q = query(
			collection(db, 'submissions'),
			where('formId', '==', formId),
			orderBy('createdAt', 'desc'),
			limit(limitDoc)
		)
		if (after) {
			const docRef = doc(db, 'submissions', after)
			const docSnap = await getDoc(docRef)
			query(q, startAfter(docSnap))
		}
		const submissionsSnapshot = await getDocs(q)
		if (submissionsSnapshot.docs.length > 0)
			submissionsSnapshot.forEach((submission) => {
				submissions.push({
					...submission.data(),
					id: submission.id,
					createdAt:
						submission.data().createdAt instanceof Timestamp
							? submission.data().createdAt.toDate().getTime()
							: new Date(submission.data().createdAt).getTime(),
				} as Submission)
			})
		return {
			data: submissions,
			lastDoc:
				submissionsSnapshot.docs[submissionsSnapshot.docs.length - 1].id ||
				null,
		}
	}

	public static async createSubmission({
		formId,
		data,
		meta,
	}: {
		formId: string
		data: SubmissionData
		meta?: SubmissionMeta
	}) {
		const submissionBody: {
			formId: string
			data: SubmissionData
			createdAt: any
			meta?: SubmissionMeta
		} = {
			formId,
			data,
			createdAt: serverTimestamp(),
		}
		if (meta) {
			submissionBody['meta'] = meta
		}
		const submission = await addDoc(
			collection(db, 'submissions'),
			submissionBody
		)
		console.log('Submission created with ID: ', submission.id)
		return submission.id
	}

	public static async deleteSubmission({ id }: { id: string }) {
		await deleteDoc(doc(db, 'submissions', id))
	}
}
