import { Button } from '@/components/ui/button'
import { MdKeyboardBackspace } from 'react-icons/md'
import { Link } from 'react-router-dom'

function NotFound() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-9xl">404</h1>
				<h2 className="text-xl">Not Found!</h2>
				<Link to={'/'}>
					<Button variant={'outline'} className="mt-4 text-md">
						<MdKeyboardBackspace className="h-6 w-6 text-muted-foreground" />
						Go Back
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
