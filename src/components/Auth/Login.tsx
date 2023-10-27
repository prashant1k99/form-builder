import { FcGoogle } from 'react-icons/fc'
import { Button } from '../ui/button'
import useAuth from '@/hooks/useAuth'

function Login() {
	const { signInWithGoogle } = useAuth()

	return (
		<div className="flex flex-col h-full w-full justify-center items-center">
			<h1 className="text-4xl font-bold mb-4">Sign In</h1>
			<Button
				className="gap-2 p-4 m-2"
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
