import {
	GoogleAuthProvider,
	User,
	onAuthStateChanged,
	signInWithPopup,
	signOut as signOutFirebase,
} from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { createContext, useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'

type AuthProviderState = {
	authState: 'authenticated' | 'unauthenticated' | 'loading'
	token: string | null
	setToken: (token: string | null) => void
	user: User
	setUser: (user: User) => void
	signOut: () => void
	signInWithGoogle: () => void
}

const initialState: AuthProviderState = {
	authState: 'unauthenticated',
	token: null,
	setToken: () => null,
	user: {} as User,
	setUser: () => null,
	signOut: () => null,
	signInWithGoogle: () => null,
}

export const AuthProviderContext = createContext<AuthProviderState | null>(
	initialState
)

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [token, setToken] = useState<string | null>(null)
	const [user, setUser] = useState<User>({} as User)
	const [authState, setAuthState] =
		useState<AuthProviderState['authState']>('loading')

	const navigate = useNavigate()

	useEffect(() => {
		const token = localStorage.getItem('token')
		const user = JSON.parse(localStorage.getItem('user') || '{}')
		setToken(token)
		setUser(user)
		if (token) setAuthState('authenticated')
	}, [])

	onAuthStateChanged(auth, (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
			setUser(user)
		} else {
			localStorage.removeItem('user')
			setUser({} as User)
		}
	})

	const signOut = async () => {
		try {
			setAuthState('loading')
			await signOutFirebase(auth)
			localStorage.removeItem('token')
			setToken(null)
			setAuthState('unauthenticated')
			navigate('/login')
		} catch (error) {
			setAuthState('authenticated')
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description:
					error instanceof Error ? error.message : 'An unknown error occurred.',
				action: (
					<ToastAction
						altText="Try again"
						onClick={(e) => {
							e.preventDefault()
							signInWithGoogle()
						}}>
						Try again
					</ToastAction>
				),
			})
		}
	}

	const signInWithGoogle = async () => {
		try {
			setAuthState('loading')
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential?.accessToken
			localStorage.setItem('token', token || '')
			setAuthState('authenticated')

			navigate('/')
		} catch (error) {
			setAuthState('unauthenticated')
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description:
					error instanceof Error ? error.message : 'An unknown error occurred.',
				action: (
					<ToastAction
						altText="Try again"
						onClick={(e) => {
							e.preventDefault()
							signInWithGoogle()
						}}>
						Try again
					</ToastAction>
				),
			})
		}
	}

	return (
		<AuthProviderContext.Provider
			value={{
				authState,
				token,
				setToken,
				user,
				setUser,
				signOut,
				signInWithGoogle,
			}}>
			{children}
		</AuthProviderContext.Provider>
	)
}
