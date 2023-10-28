import CreateForm from '@/components/Dashboard/CreateForm'
import CreateFormSheet from '@/components/Dashboard/CreateFormSheet'
import { MdEdit } from 'react-icons/md'

function Dashboard() {
	return (
		<div className="flex flex-col justify-start items-center h-full">
			<h1>Dashboard</h1>
			<CreateForm />
			<CreateFormSheet>
				<MdEdit className="w-8 h-8" />
			</CreateFormSheet>
		</div>
	)
}

export default Dashboard
