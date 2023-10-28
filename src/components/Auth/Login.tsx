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
			<div className="m-auto dark:bg-gray-800 bg-gray-200 border-0 border-r-1 border-gray-500 w-3/5 h-full md:flex flex-row-reverse justify-center items-center hidden">
				<div className="w-full lg:w-4/5 m-4 flex flex-col justify-end items-end p-4">
					<div className="p-4">
						<h2 className="text-4xl font-bold mb-4">
							<span className="text-blue-500">FormsBro!</span>
						</h2>
						<p className="text-muted-foreground">
							Craft Tailored Forms with Ease and Precision!
						</p>
					</div>
				</div>
				<div className="w-4/5 h-full hidden lg:block">
					<div className="bg-[url(@/assets/Forms-bro.svg)] bg-no-repeat bg-bottom bg-contain w-3/5 h-full" />
				</div>
			</div>
			<div className="flex flex-col justify-start p-10 w-full md:w-2/5">
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
				<span className="text-gray-500 mt-2 text-sm">
					By continuing, you agree to our Terms of Service and Privacy Policy.
				</span>
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
