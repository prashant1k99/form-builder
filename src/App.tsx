import './App.css'
import Builder from '@/Builder'
import { ThemeProvider } from '@/lib/context/ThemeContext'
import Layout from '@/components/Layout'
import { Toaster } from '@/components/ui/toaster'
import DesignerContextProvider from '@/lib/context/DesignerContext'

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<DesignerContextProvider>
				<Layout>
					<Builder />
					<Toaster />
				</Layout>
			</DesignerContextProvider>
		</ThemeProvider>
	)
}

export default App
