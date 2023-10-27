import { Navigate } from 'react-router-dom'

function NoAuth({ children }: { children: React.ReactNode }) {
	const token = localStorage.getItem('token')
	return token ? <Navigate to="/" /> : children
}

export default NoAuth
