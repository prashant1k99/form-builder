import FormBuilder from '@/components/FormBuilder/FormBuilder'

import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import DragOverlayWrapper from '@/components/FormBuilder/DragOverlayWrapper'

function App() {
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
			<DndContext sensors={sensors}>
				<div className="flex flex-col-reverse md:flex-col h-full">
					<FormBuilder />
					<DragOverlayWrapper />
				</div>
			</DndContext>
		</>
	)
}

export default App
