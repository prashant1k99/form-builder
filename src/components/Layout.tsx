import NavBar from './NavBar'

function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen flex flex-col">
			<NavBar />
			{children}
		</div>
	)
}

export default Layout
