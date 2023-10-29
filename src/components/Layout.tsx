import NavBar from './NavBar'
import { ScrollArea } from './ui/scroll-area'

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<ScrollArea className="h-screen w-screen">
			<div className="h-screen flex flex-col">
				<NavBar />
				{children}
			</div>
		</ScrollArea>
	)
}

export default Layout
