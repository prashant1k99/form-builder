import { Link } from 'react-router-dom'
import ThemeSwitcher from './ThemeSwitcher'
import { UserNav } from './UserNav'

function NavBar() {
	return (
		<nav className="flex flex-col w-full">
			<div className="flex justify-between border-b-2 dark:border-grey-500 p-1 px-4 gap-3 items-center">
				<div className="flex flex-row items-center">
					<Link
						to={'/'}
						className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer">
						CF!
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
