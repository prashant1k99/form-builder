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
	updateDoc,
	deleteDoc,
	QueryDocumentSnapshot,
} from 'firebase/firestore'
import { Form, ModifyForm } from '@/types/forms'

export default class Forms {
	public static async getForms({
		uid,
		order = 'desc',
		after,
		limitDoc = 10,
	}: {
		uid: string
		order: 'asc' | 'desc'
		after?: QueryDocumentSnapshot | null
		limitDoc?: number
	}) {
		const forms: Form[] = []
		let q = query(
			collection(db, 'forms'),
			where('userId', '==', uid),
			orderBy('createdAt', order),
			limit(limitDoc)
		)
		if (after) {
			q = query(q, startAfter(after))
		}
		const formsSnapshot = await getDocs(q)
		if (formsSnapshot.docs.length > 0)
			formsSnapshot.forEach((form) => {
				forms.push({
					...form.data(),
					id: form.id,
					createdAt: form.data().createdAt.toDate(),
					updatedAt: form.data().updatedAt.toDate(),
					fields: form.data().fields || [],
				} as Form)
			})
		return { forms, lastDoc: formsSnapshot.docs.pop() || null }
	}

	public static async getFormById(id: string) {
		const docRef = doc(db, 'forms', id)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) {
			throw new Error('No such document!')
		}

		return { ...docSnap.data(), id: docSnap.id } as Form
	}

	public static async createForm(uid: string, form: ModifyForm): Promise<Form> {
		const docRef = await addDoc(collection(db, 'forms'), {
			...form,
			state: 'draft',
			userId: uid,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		})
		return {
			...form,
			fields: form.fields || [],
			id: docRef.id,
			userId: uid,
			createdAt: new Date(),
			updatedAt: new Date(),
		} as Form
	}

	public static async updateForm(id: string, form: ModifyForm): Promise<void> {
		console.log('UPDATING FORM: ', id)
		const docRef = doc(db, 'forms', id)
		await updateDoc(docRef, {
			...form,
			updatedAt: serverTimestamp(),
		})
	}

	public static async updateElements(
		id: string,
		elements: Form['fields']
	): Promise<void> {
		const docRef = doc(db, 'forms', id)
		await updateDoc(docRef, {
			fields: elements,
			updatedAt: serverTimestamp(),
		})
	}

	public static async deleteForm(id: string): Promise<void> {
		const docRef = doc(db, 'forms', id)
		await deleteDoc(docRef)
	}
}
