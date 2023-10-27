import { FcGoogle } from 'react-icons/fc'
import { BsArrowRight } from 'react-icons/bs'
import { Button } from '../ui/button'
import useAuth from '@/hooks/useAuth'
import { useState } from 'react'

function Login() {
	const { signInWithGoogle } = useAuth()
	const [isSigningIn, setIsSigningIn] = useState(false)

	return (
		<div className="flex flex-row h-full w-full justify-center items-center">
			<div className="m-auto bg-gray-800 border-0 border-r-1 border-gray-500 w-2/5 h-full bg-accent bg-[url(@/assets/Forms-bro.svg)] bg-no-repeat bg-bottom bg-contain"></div>
			<div className="flex flex-col justify-start p-10 w-3/5">
				<h1 className="text-4xl font-bold mb-4">
					{isSigningIn ? 'Sign In' : 'Create your Account'}
				</h1>
				<p className="text-gray-500 mb-4">
					{isSigningIn
						? 'Sign in to your account to continue'
						: 'Create your account to continue'}
				</p>
				<Button
					className="gap-2 max-w-md group"
					onClick={(e) => {
						e.preventDefault()
						signInWithGoogle()
					}}>
					<FcGoogle className="h-8 w-8" />
					Continue with Google
					<BsArrowRight className="h-6 w-6 opacity-0 transition-opacity ease-in-out duration-300 group-hover:opacity-100 " />
				</Button>
				<span className="text-gray-500 mt-4">
					Don't have an account?{' '}
					<a
						href="#"
						className="text-blue-500 hover:underline"
						onClick={(e) => {
							e.preventDefault()
							setIsSigningIn((prev) => !prev)
						}}>
						{isSigningIn ? 'Sign Up' : 'Sign In'}
					</a>
				</span>
			</div>
		</div>
	)
}

export default Login
