import { LegacyRef, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
import FormSubmission from '@/components/FormData/FormSubmissions'
import { toast } from '@/components/ui/use-toast'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHooks'
import { setOrUpdateActiveForm, updateForm, fetchForm } from '@/state/form'
import { PiGearSixLight } from 'react-icons/pi'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import FormSettings from '@/components/FormSettings'

const FormData = () => {
	const { id } = useParams()
	const dispatch = useAppDispatch()
	const [searchParams, setSearchParams] = useSearchParams()
	const landingFirst = searchParams.get('landingFirst') == 'true' ? true : false
	const navigation = useNavigate()
	const [isLoading, setIsLoading] = useState(true)
	const [formData, setFormData] = useState<Form | null>(null)
	const [isCopied, setIsCopied] = useState(false)
	const [updatingForm, setUpdatingForm] = useState(false)

	const dialogRef = useRef<HTMLLIElement>(null)

	const link = window.location.origin + '/form/' + id

	const copyLink = () => {
		navigator.clipboard.writeText(link)
		setIsCopied(true)
		if (landingFirst) {
			searchParams.delete('landingFirst')
			setSearchParams(searchParams)
		}
		toast({
			title: 'Copied to clipboard.',
			description: 'Share this link to users.',
		})
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	const form = useAppSelector((state) =>
		state.forms.forms.find((f) => f.id == id)
	)

	const activeForm = useAppSelector((state) => state.forms.activeForm)
	const activeFormHasChanges = useAppSelector(
		(state) => state.forms.activeFormHasChanges
	)

	const setActiveForm = (form: Form) => {
		dispatch(setOrUpdateActiveForm(form))
	}

	useEffect(() => {
		if (landingFirst) dialogRef.current?.click()
	}, [landingFirst])

	const updateFormSubmit = () => {
		if (!form) return
		setUpdatingForm(true)
		dispatch(
			updateForm({
				formId: form.id,
				form: form,
			})
		)
			.then(() => {
				setActiveForm(form)
				toast({
					title: 'Form updated.',
					description: 'Your form has been updated.',
				})
			})
			.catch((error: Error) => {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description:
						error instanceof Error
							? error.message
							: 'An unknown error occurred.',
				})
			})
			.finally(() => {
				setUpdatingForm(false)
			})
	}

	useEffect(() => {
		if (!activeForm) return
		setFormData(activeForm)
		setIsLoading(false)
	}, [activeForm])

	useEffect(() => {
		if (form) {
			setActiveForm(form)
			setIsLoading(false)
		}
		if (!form) {
			setIsLoading(true)
			dispatch(
				fetchForm({
					formId: id as string,
				})
			)
				.then((action) => {
					const form = action.payload as Form
					setActiveForm(form)
					setFormData(form)
					if (form.state !== 'published') {
						navigation('/builder/' + id)
					}
				})
				.catch((error) => {
					console.error(error)
					navigation('/not-found')
				})
			// .finally(() => setIsLoading(false))
		}
	}, [id])

	return (
		<div className={cn('my-5', isLoading && 'h-full')}>
			{isLoading && !formData && <Loader />}
			{formData && (
				<div className="flex flex-col max-w-[700px] w-full md:w-3/5 m-auto h-full p-5">
					<Alert variant={'default'} className="mb-6 border-branding">
						<AiOutlineAlert className="h-4 w-4" />
						<AlertTitle className="text-branding">Heads up!</AlertTitle>
						<AlertDescription>
							Embedable link coming soon. For now, you can share this link to
							users.
						</AlertDescription>
					</Alert>
					<div className="flex flex-col w-full sm:flex-row sm:justify-between sm:items-center gap-4">
						<div>
							<h1 className="text-3xl font-semibold">{formData.name}</h1>
							<p className="text-sm text-muted-foreground">
								All of the data collected from your forms.
							</p>
						</div>
						<div className="flex items-center flex-row-reverse md:flex-row w-full sm:w-fit md:justify-end">
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant={'secondary'}
										className="w-full md:w-fit mr-2">
										<PiGearSixLight className="w-4 h-4" />
									</Button>
								</SheetTrigger>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Edit profile</SheetTitle>
										<SheetDescription>
											Make changes to your profile here. Click save when you're
											done.
										</SheetDescription>
									</SheetHeader>
									<div className="grid gap-4 py-4 w-full">
										<FormSettings />
									</div>
									<SheetFooter>
										<Button
											disabled={!activeFormHasChanges || updatingForm}
											onClick={(e) => {
												e.preventDefault()
												updateFormSubmit()
											}}
											className="w-full"
											type="submit">
											Update Form
										</Button>
										<SheetClose asChild></SheetClose>
									</SheetFooter>
								</SheetContent>
							</Sheet>
							<Link to={`/form/${id}`}>
								<Button variant={'secondary'} className="w-full md:w-fit px-10">
									<GoProjectSymlink className="w-6 h-6 mr-2" />
									Visit
								</Button>
							</Link>
						</div>
					</div>
					<Separator className="my-6" />
					<div
						className="flex items-center justify-between text-sm leading-6 py-3 px-6 border-2 rounded-md border-primary/20 cursor-pointer border-primary"
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
					<div className="w-full h-full">
						<FormSubmission id={id as string} />
					</div>
				</div>
			)}
			<Dialog>
				<DialogTrigger asChild>
					<button
						ref={dialogRef as unknown as LegacyRef<HTMLButtonElement>}
						className="hidden">
						Form Published
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>🎊🎊 Form Published! 🎊🎊</DialogTitle>
					</DialogHeader>
					<p className="text-lg">Share this form.</p>
					<p className="text-muted-foreground">
						Anyone with the link can view and submit the form.
					</p>
					<DialogDescription>
						<div className="flex items-center justify-between text-sm leading-6">
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
						</div>
					</DialogDescription>
					<DialogFooter>
						<Button
							variant={'outline'}
							className="w-full md:w-fit"
							onClick={(e) => {
								e.preventDefault()
								copyLink()
							}}>
							{!isCopied ? (
								<BiCopyAlt className="w-4 h-4" />
							) : (
								<BsCheckLg className="w-4 h-4 text-branding" />
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default FormData
