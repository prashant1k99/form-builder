import { Form } from '@/types/forms'
import { Link } from 'react-router-dom'
import { HiOutlinePencil } from 'react-icons/hi'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

function FormListItem({ form }: { form: Form }) {
	return (
		<div className="flex flex-row border justify-between border-gray-600 rounded-md w-full space-x-4 p-4 hover:dark:bg-slate-900">
			<div className="space-y-1">
				<h4 className="text-xl font-semibold">
					{form.name}
					{form.state != 'published' && (
						<Badge className="ml-3" variant={'destructive'}>
							Draft
						</Badge>
					)}
				</h4>
				<p className="text-sm">{form.description || 'No description'}</p>
				<div className="flex items-center pt-2">
					<span className="text-xs text-muted-foreground">
						created on {new Date(form.createdAt).toLocaleString()}
					</span>
				</div>
			</div>
			<div className="flex items-center justify-end">
				<Link
					to={`/builder/${form.id}`}
					className="text-sm text-blue-500 hover:underline">
					<Button
						variant={'outline'}
						className="bg-transparent border-none hover:border-1"
						size={'icon'}>
						<HiOutlinePencil className="h-5 w-5" />
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default FormListItem
