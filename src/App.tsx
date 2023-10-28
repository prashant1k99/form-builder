import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Dashboard from '@/pages/Dashboard'
import Builder from '@/pages/Builder'
import { ThemeProvider } from '@/lib/context/ThemeContext'
import Layout from '@/components/Layout'
import NotFound from '@/pages/NotFound'
import Protected from '@/components/Auth/Protected'
import Login from '@/components/Auth/Login'
import { Toaster } from '@/components/ui/toaster'
import NoAuth from './components/Auth/NoAuth'
import AuthProvider from './lib/context/AuthContext'
import Form from '@/pages/Form'

function App() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Protected />}>
							<Route path="/" element={<Dashboard />} />
							<Route path="/builder/:id" element={<Builder />} />
							<Route path="/data/:id" element={<Builder />} />
						</Route>
						<Route
							path="/auth"
							element={
								<NoAuth>
									<Login />
								</NoAuth>
							}
						/>
						<Route path="/error-page" element={<NotFound />} />
						<Route path="/form/:id" element={<Form />} />
						<Route path="*" element={<Navigate to="/error-page" />} />
					</Routes>
					<Toaster />
				</Layout>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default App
