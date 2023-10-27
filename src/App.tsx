import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from '@/pages/dashboard'
import Builder from '@/pages/Builder'
import { ThemeProvider } from '@/lib/theme-provider'
import Layout from '@/components/Layout'
import NotFound from '@/pages/NotFound'

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Layout>
				<Routes>
					<Route path="/" element={<Dashboard />} />
					<Route path="/builder/:id" element={<Builder />} />
					<Route path="/data/:id" element={<Builder />} />
					<Route path="/:id" element={<Builder />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</ThemeProvider>
	)
}

export default App
