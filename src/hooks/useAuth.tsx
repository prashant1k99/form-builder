import { useContext } from 'react'
import { AuthProviderContext } from '@/lib/context/AuthContext'

function useDesigner() {
	const context = useContext(AuthProviderContext)
	if (!context) {
		throw new Error('useAuth must be used within a AuthProviderContext')
	}
	return context
}

export default useDesigner
