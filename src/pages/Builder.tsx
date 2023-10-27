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
import { useParams } from 'react-router-dom'

function App() {
	const { id } = useParams()

	const formData = {
		id,
		name: 'Test Form',
		elements: [],
	}

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
	)
}

export default App
