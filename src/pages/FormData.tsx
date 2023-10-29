import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/reduxHooks'
import { useNavigate, useParams } from 'react-router-dom'
import Forms from '@/data/forms'
import { Form } from '@/types/forms'
import Loader from '@/components/Loader'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GoProjectSymlink } from 'react-icons/go'
import { Separator } from '@/components/ui/separator'
import { BsCheckLg, BsLink45Deg } from 'react-icons/bs'
import { BiCopyAlt } from 'react-icons/bi'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AiOutlineAlert } from 'react-icons/ai'

const FormData = () => {
	const { id } = useParams()
	const navigation = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const [formData, setFormData] = useState<Form | null>(null)
	const [isCopied, setIsCopied] = useState(false)

	const link = window.location.origin + '/form/' + id

	const copyLink = () => {
		navigator.clipboard.writeText(link)
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	const form = useAppSelector((state) =>
		state.forms.forms.find((f) => f.id == id)
	)
	useEffect(() => {
		if (form) {
			setFormData(form)
			setIsLoading(false)
		}
		if (!form) {
			setIsLoading(true)
			Forms.getFormById(id as string)
				.then((form) => {
					setFormData(form)
				})
				.catch((error) => {
					console.error(error)
					navigation('/not-found')
				})
				.finally(() => setIsLoading(false))
		}
	}, [id])

	return (
		<div className={cn('my-5', isLoading && 'h-full')}>
			{isLoading && !formData && <Loader />}
			{formData && (
				<div className="flex flex-col max-w-[700px] w-full md:w-3/5 m-auto h-full p-5">
					<div className="flex flex-col w-full sm:flex-row sm:justify-between sm:items-center gap-4">
						<div>
							<h1 className="text-3xl font-semibold">{formData.name}</h1>
							<p className="text-sm text-muted-foreground">
								All of the data collected from your forms.
							</p>
						</div>
						<div className="flex items-center flex-row-reverse md:flex-row w-full sm:w-fit md:justify-end">
							<Button variant={'secondary'} className="w-full md:w-fit px-10">
								<GoProjectSymlink className="w-6 h-6 mr-2" />
								Visit
							</Button>
						</div>
					</div>
					<Separator className="my-6" />
					<Alert variant={'default'} className="mb-6 border-branding">
						<AiOutlineAlert className="h-4 w-4 bg-branding" />
						<AlertTitle className="text-branding">Heads up!</AlertTitle>
						<AlertDescription>
							Embedable link coming soon. For now, you can share this link to
							users.
						</AlertDescription>
					</Alert>
					<div
						className="flex items-center justify-between text-sm leading-6"
						onClick={(e) => {
							e.preventDefault()
							e.stopPropagation()
							copyLink()
						}}>
						<div className="flex w-0 flex-1 items-center">
							<BsLink45Deg
								className="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger>
										<div className="ml-4 flex min-w-0 flex-1 gap-2">
											<span className="truncate font-medium">{link}</span>
										</div>
									</TooltipTrigger>
									<TooltipContent>
										<p>Share this link to users.</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
						<div className="ml-4 flex-shrink-0">
							<Button variant={'outline'} className="w-full md:w-fit">
								{!isCopied ? (
									<BiCopyAlt className="w-4 h-4" />
								) : (
									<BsCheckLg className="w-4 h-4 text-branding" />
								)}
							</Button>
						</div>
					</div>
					<Separator className="my-6" />
				</div>
			)}
		</div>
	)
}

export default FormData
