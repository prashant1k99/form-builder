import './App.css'
import FormBuilder from './components/FormBuilder'
import { ThemeProvider } from '@/lib/theme-provider'
import PreviewDialogBtn from '@/components/PreviewDialogBtn'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { DndContext } from '@dnd-kit/core'
import DragOverlayWrapper from './components/DragOverlayWrapper'
import DesignerContextProvider from './components/context/DesignerContext'

const formData = {
	name: 'Test Form',
}

function App() {
	return (
		<DesignerContextProvider>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<DndContext>
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
