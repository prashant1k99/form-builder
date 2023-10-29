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
import Forms from '@/data/forms'
import { useEffect, useState } from 'react'

import Loader from '@/components/Loader'
import FormSaveBtn from '@/components/FormBuilder/FormSaveBtn'
import PublishBtn from '@/components/FormBuilder/PublishBtn'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import { setActiveForm } from '@/state/form'
import { Form } from '@/types/forms'

function App() {
	const { id } = useParams()
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()

	const dispatch = useAppDispatch()

	const forms = useAppSelector((state) => state.forms.forms)
	const setForm = (activeForm: Form) => dispatch(setActiveForm(activeForm))
	const form = useAppSelector((state) => state.forms.activeForm)

	useEffect(() => {
		setLoading(true)
		if (!id) navigate(`/not-found`)
		const activeForm = forms.find((form) => form.id === id)
		if (activeForm) {
			setForm(activeForm)
			setLoading(false)
			return
		} else {
			Forms.getFormById(id as string)
				.then((form) => {
					if (!form) navigate(`/not-found`)
					setForm(form)
					setLoading(false)
				})
				.catch((error) => {
					console.error(error)
					navigate(`/not-found`)
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
