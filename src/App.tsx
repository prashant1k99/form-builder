import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from '@/pages/Dashboard'
import Builder from '@/pages/Builder'
import { ThemeProvider } from '@/lib/theme-provider'
import Layout from '@/components/Layout'
import NotFound from '@/pages/NotFound'
import Protected from '@/components/Auth/Protected'
import Login from '@/components/Auth/Login'
import { Toaster } from '@/components/ui/toaster'
import NoAuth from './components/Auth/NoAuth'

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<Layout>
				<Routes>
					<Route path="/" element={<Protected />}>
						<Route path="/" element={<Dashboard />} />
						<Route path="/builder/:id" element={<Builder />} />
						<Route path="/data/:id" element={<Builder />} />
					</Route>
					<Route
						path="login"
						element={
							<NoAuth>
								<Login />
							</NoAuth>
						}
					/>
					<Route path="/:id" element={<Builder />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Toaster />
			</Layout>
		</ThemeProvider>
	)
}

export default App
