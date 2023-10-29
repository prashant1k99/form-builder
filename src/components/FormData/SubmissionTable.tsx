import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

type Data = {
	id: string
	data: Record<string, number | string | boolean>
}

const SubmissionTable = ({
	headers,
	data,
	recordClicked,
}: {
	headers: string[]
	data: Data[]
	recordClicked: (id: string) => void
}) => {
	return (
		<Table className="my-4">
			<TableHeader>
				<TableRow>
					{headers.map((header) => {
						return <TableHead>{header}</TableHead>
					})}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((row) => {
					return (
						<TableRow
							className="cursor-pointer hover:bg-muted/50"
							key={row.id as string}
							onClick={(e) => {
								e.preventDefault()
								recordClicked(row.id as string)
							}}>
							{Object.keys(row.data).map((key) => {
								return <TableCell key={key}>{row.data[key]}</TableCell>
							})}
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	)
}
export default SubmissionTable
