import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import { UserNav } from './UserNav'

function NavBar() {
	return (
		<nav className="flex flex-col w-full">
			<div className="flex justify-between m-4 sm:my-1 gap-3 items-center">
				<div className="flex flex-row items-center">
					<Link
						to={'/'}
						className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer">
						FB!
					</Link>
				</div>
				<div className="flex items-center gap-4">
					<ThemeSwitcher />
					<UserNav />
				</div>
			</div>
		</nav>
	)
}

export default NavBar
