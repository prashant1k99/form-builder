import './App.css'
import FormBuilder from './components/FormBuilder'
import { ThemeProvider } from '@/lib/theme-provider'
import PreviewDialogBtn from '@/components/PreviewDialogBtn'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import DragOverlayWrapper from './components/DragOverlayWrapper'
import DesignerContextProvider from './components/context/DesignerContext'

const formData = {
	name: 'Test Form',
}

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
		<DesignerContextProvider>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<DndContext sensors={sensors}>
					<div className="h-screen flex flex-col">
						<nav className="flex flex-col w-full">
							<div className="flex justify-between border-b-2 dark:border-grey-500 p-4 gap-3 items-center">
								<h2 className="truncate font-medium">
									<span className="text-muted-foreground mr-2">Form:</span>
									{formData.name}
								</h2>
								<div className="flex items-center gap-4">
									<ThemeSwitcher />
									<PreviewDialogBtn />
								</div>
							</div>
						</nav>
						<FormBuilder />
						<DragOverlayWrapper />
					</div>
				</DndContext>
			</ThemeProvider>
		</DesignerContextProvider>
	)
}

export default App
