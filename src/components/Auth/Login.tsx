import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import { auth } from '@/lib/firebase'
import { useNavigate } from 'react-router-dom'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

function Login() {
	const navigate = useNavigate()
	const { toast } = useToast()

	const signInWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			const credential = GoogleAuthProvider.credentialFromResult(result)
			const token = credential?.accessToken
			const user = result.user
			localStorage.setItem('token', token || '')
			localStorage.setItem('user', JSON.stringify(user))
			navigate('/')
		} catch (error) {
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
		<div className="flex flex-col h-full w-full justify-center items-center">
			<h1 className="text-4xl font-bold mb-4">Sign In</h1>
			<Button
				className="gap-2 p-4"
				onClick={(e) => {
					e.preventDefault()
					signInWithGoogle()
				}}>
				<FcGoogle className="h-8 w-8" />
				Use your Google Account
			</Button>
		</div>
	)
}

export default Login
