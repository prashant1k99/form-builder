import { db } from '@/lib/firebase'
import useAuth from '@/hooks/useAuth'
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
	private static collectionName: string = 'forms'
	private static currentUser = useAuth().user

	public static async getForms(
		uid: string,
		after?: Form,
		limitDoc: number = 10
	) {
		console.log(this.currentUser)
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
		const docRef = doc(db, this.collectionName, id)
		const docSnap = await getDoc(docRef)

		if (!docSnap.exists()) {
			throw new Error('No such document!')
		}

		return { ...docSnap.data(), id: docSnap.id } as Form
	}

	public async createForm(
		form: Omit<Form, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
	): Promise<Form> {
		const docRef = await addDoc(collection(db, this.collectionName), {
			...form,
			userId: this.currentUser?.uid,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		})
		return {
			...form,
			id: docRef.id,
			userId: this.currentUser?.uid,
			createdAt: new Date(),
			updatedAt: new Date(),
		} as Form
	}

	public async updateForm(id: string, form: Form): Promise<void> {
		const docRef = doc(db, this.collectionName, id)
		await updateDoc(docRef, {
			...form,
			updatedAt: serverTimestamp(),
		})
	}

	public async updateElements(
		id: string,
		elements: Form['fields']
	): Promise<void> {
		const docRef = doc(db, this.collectionName, id)
		await updateDoc(docRef, {
			fields: elements,
			updatedAt: serverTimestamp(),
		})
	}

	public async deleteForm(id: string): Promise<void> {
		const docRef = doc(db, this.collectionName, id)
		await deleteDoc(docRef)
	}
}
