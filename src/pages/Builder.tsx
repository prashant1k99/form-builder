import FormBuilder from '@/components/FormBuilder'

import PreviewDialogBtn from '@/components/PreviewDialogBtn'
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import DragOverlayWrapper from '@/components/DragOverlayWrapper'
import DesignerContextProvider from '@/lib/context/DesignerContext'
import { useNavigate, useParams } from 'react-router-dom'
import Forms from '@/data/forms'
import { useEffect, useState } from 'react'
import { Form } from '@/types/forms'
import { ImSpinner2 } from 'react-icons/im'

function App() {
	const { id } = useParams()
	const [loading, setLoading] = useState(true)
	const [formData, setFormData] = useState<Form | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		setLoading(true)
		if (!id) navigate(`/not-found`)
		Forms.getFormById(id as string)
			.then((form) => {
				if (!form) navigate(`/not-found`)
				setFormData(form)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				navigate(`/not-found`)
			})
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
			{loading && (
				<div className="w-full h-full flex justify-center items-center">
					<ImSpinner2 className="animate-spin h-12 w-12" />
				</div>
			)}
			{!loading && formData && (
				<DesignerContextProvider>
					<DndContext sensors={sensors}>
						<nav className="flex flex-col w-full">
							<div className="flex justify-between border-b-2 dark:border-grey-500 p-4 gap-3 items-center">
								<h2 className="truncate font-medium">
									<span className="text-muted-foreground mr-2">Form:</span>
									{formData.name}
								</h2>
								<div className="flex items-center gap-4">
									{/* <ThemeSwitcher /> */}
									<PreviewDialogBtn />
								</div>
							</div>
						</nav>
						<FormBuilder />
						<DragOverlayWrapper />
					</DndContext>
				</DesignerContextProvider>
			)}
		</>
	)
}

export default App
