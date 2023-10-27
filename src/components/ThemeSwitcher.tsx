import { useTheme } from '@/lib/context/ThemeContext'
import { Button } from './ui/button'
import { MdDarkMode, MdSunny } from 'react-icons/md'

function ThemeSwitcher() {
	const { theme, setTheme } = useTheme()

	const changeTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	return (
		<Button variant={'outline'} size={'icon'} onClick={changeTheme}>
			{theme === 'dark' ? (
				<MdSunny className="h-[1.2rem] w-[1.2rem]" />
			) : (
				<MdDarkMode className="h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0" />
			)}
		</Button>
	)
}

export default ThemeSwitcher
