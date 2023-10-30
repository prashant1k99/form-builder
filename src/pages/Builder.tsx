import FormBuilder from '@/components/FormBuilder/FormBuilder'

import PreviewDialogBtn from '@/components/FormBuilder/PreviewDialogBtn'
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import DragOverlayWrapper from '@/components/FormBuilder/DragOverlayWrapper'
import DesignerContextProvider from '@/lib/context/DesignerContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Loader from '@/components/Loader'
import FormSaveBtn from '@/components/FormBuilder/FormSaveBtn'
import PublishBtn from '@/components/FormBuilder/PublishBtn'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setActiveForm as setActiveFormInState, fetchForm } from '@/state/form'
import { Form } from '@/types/forms'

function App() {
	const { id } = useParams()
	const [loading, setLoading] = useState(true)
	const [form, setForm] = useState<Form | null>(null)
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const forms = useAppSelector((state) => state.forms.forms)
	const setActiveForm = (form: Form) => dispatch(setActiveFormInState(form))

	useEffect(() => {
		setLoading(true)
		if (!id) navigate(`/not-found`)
		const activeForm = forms.find((form) => form.id === id)
		if (activeForm) {
			setForm(activeForm)
			setActiveForm(activeForm)
			setLoading(false)
			return
		} else {
			dispatch(
				fetchForm({
					formId: id as string,
				})
			)
				.then((action) => {
					const form = action.payload as Form
					if (!form) navigate(`/not-found`)
					setActiveForm(form)
					setForm(form)
				})
				.catch((error) => {
					console.error(error)
					navigate(`/not-found`)
				})
				.finally(() => {
					setLoading(false)
				})
		}
	}, [id])

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	})

	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		},
	})

	const sensors = useSensors(mouseSensor, touchSensor)

	return (
		<>
			{loading && <Loader />}
			{!loading && form && (
				<DesignerContextProvider>
					<DndContext sensors={sensors}>
						<div className="flex flex-col-reverse md:flex-col h-full">
							<nav className="flex flex-col w-full">
								<div className="flex justify-between border-y-2 dark:border-grey-500 p-3 gap-3 items-center">
									<h2 className="truncate font-medium hidden sm:block">
										<span className="text-muted-foreground mr-2">Form:</span>
										{form.name}
									</h2>
									<div className="flex items-center gap-4">
										<PreviewDialogBtn />
										{form.state !== 'published' && (
											<>
												<FormSaveBtn />
												<PublishBtn />
											</>
										)}
									</div>
								</div>
							</nav>
							<FormBuilder />
							<DragOverlayWrapper />
						</div>
					</DndContext>
				</DesignerContextProvider>
			)}
		</>
	)
}

export default App
