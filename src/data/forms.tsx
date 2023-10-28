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
} from 'firebase/firestore'
import { Form } from '@/types/forms'

export default class Forms {
	public static async getForms(
		uid: string,
		after?: Form,
		limitDoc: number = 10
	) {
		const forms: Form[] = []
		let q = query(
			collection(db, 'forms'),
			where('userId', '==', uid),
			orderBy('createdAt', 'desc'),
			limit(limitDoc)
		)
		if (after) {
			q = query(q, startAfter(after))
		}
		const formsSnapshot = await getDocs(q)
		formsSnapshot.forEach((form) => {
			forms.push({ ...form.data(), id: form.id } as Form)
		})
		return forms
	}

	public async getFormById(id: string) {
		const docRef = doc(db, 'forms', id)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) {
			throw new Error('No such document!')
		}

		return { ...docSnap.data(), id: docSnap.id } as Form
	}

	public async createForm(
		uid: string,
		form: Omit<Form, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
	): Promise<Form> {
		const docRef = await addDoc(collection(db, 'forms'), {
			...form,
			userId: uid,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		})
		return {
			...form,
			id: docRef.id,
			userId: uid,
			createdAt: new Date(),
			updatedAt: new Date(),
		} as Form
	}

	public async updateForm(id: string, form: Form): Promise<void> {
		const docRef = doc(db, 'forms', id)
		await updateDoc(docRef, {
			...form,
			updatedAt: serverTimestamp(),
		})
	}

	public async updateElements(
		id: string,
		elements: Form['fields']
	): Promise<void> {
		const docRef = doc(db, 'forms', id)
		await updateDoc(docRef, {
			fields: elements,
			updatedAt: serverTimestamp(),
		})
	}

	public async deleteForm(id: string): Promise<void> {
		const docRef = doc(db, 'forms', id)
		await deleteDoc(docRef)
	}
}
