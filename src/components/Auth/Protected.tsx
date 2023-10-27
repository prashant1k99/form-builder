import { Navigate, Outlet } from 'react-router-dom'

function Protected() {
	const token = localStorage.getItem('token')
	return token ? <Outlet /> : <Navigate to="/auth" />
}

export default Protected
