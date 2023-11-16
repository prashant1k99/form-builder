import PreviewDialogBtn from '@/components/FormBuilder/PreviewDialogBtn'
import ThemeSwitcher from './ThemeSwitcher'

function NavBar() {
	return (
		<nav className="flex flex-col w-full">
			<div className="flex justify-between m-4 sm:my-1 gap-3 py-2 items-center">
				<div className="flex flex-row items-center">
					<div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 text-transparent bg-clip-text">
						Form Builder
					</div>
				</div>
				<div className="flex items-center gap-4">
					<PreviewDialogBtn />
					<ThemeSwitcher />
				</div>
			</div>
		</nav>
	)
}

export default NavBar
