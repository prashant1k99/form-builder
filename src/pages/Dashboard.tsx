import CreateForm from '@/components/Dashboard/CreateForm'
import FormListItem from '@/components/Dashboard/FormListItem'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import useAuth from '@/hooks/useAuth'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'
import { LegacyRef, useEffect, useState } from 'react'
import { AiOutlineFileAdd, AiOutlineSortAscending } from 'react-icons/ai'
import { BsSortAlphaUpAlt } from 'react-icons/bs'
import { Skeleton } from '@/components/ui/skeleton'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'
import {
	setSort as setSortState,
	fetchForms as fetchFormsState,
} from '@/state/form'

function Dashboard() {
	const [formsLoading, setFormsLoading] = useState(true)
	const { user } = useAuth()

	const formsList = useAppSelector((state) => state.forms.forms)
	const sort = useAppSelector((state) => state.forms.sort)
	const hasMore = useAppSelector((state) => state.forms.hasMore)
	const lastDoc = useAppSelector((state) => state.forms.lastForm) || undefined
	const limit = useAppSelector((state) => state.forms.limit)
	const dispatch = useAppDispatch()
	const setSort = (sort: 'asc' | 'desc') => dispatch(setSortState(sort))

	const fetchForms = () => {
		dispatch(
			fetchFormsState({
				uid: user.uid,
				sort,
				lastDoc,
				limitDoc: limit,
			})
		)
			.catch((error) => {
				console.error(error)
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
				setFormsLoading(false)
			})
	}

	useEffect(() => {
		if (!user.uid) {
			return
		}
		console.log('USE EFFECT')
		setFormsLoading(true)
		fetchForms()
	}, [user.uid, sort])

	const lastProductRef = useIntersectionObserver<HTMLElement>(() => {
		setFormsLoading(true)
		if (hasMore) {
			fetchForms()
		}
	}, [hasMore, !formsLoading])

	return (
		<div className={cn('my-5', formsLoading && 'h-full')}>
			<div className="flex flex-col max-w-[700px] w-full md:w-3/5 m-auto h-full p-5">
				<div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold font-sans">Your Forms</h1>
						<p className="text-sm text-muted-foreground">
							Here you can manage your forms.
						</p>
					</div>
					<div className="flex items-center flex-row-reverse md:flex-row w-full sm:w-fit md:justify-end">
						<Button
							variant={'ghost'}
							className="hover:bg-transparent cursor-pointer"
							onClick={() => {
								setSort(sort === 'asc' ? 'desc' : 'asc')
							}}>
							{sort == 'asc' ? (
								<BsSortAlphaUpAlt className="w-6 h-6" />
							) : (
								<AiOutlineSortAscending className="w-6 h-6" />
							)}
						</Button>
						<CreateForm>
							<Button variant={'secondary'} className="w-full md:w-fit">
								<AiOutlineFileAdd className="w-6 h-6 mr-2" />
								Create New Form
							</Button>
						</CreateForm>
					</div>
				</div>
				<Separator className="my-6" />
				{formsLoading && formsList.length == 0 ? (
					<Loader />
				) : (
					<div className="flex flex-col mt-4 gap-4">
						{formsList.length > 0 &&
							formsList.map((form, i, forms) => {
								return (
									<li
										ref={
											forms.length - 1 === i
												? (lastProductRef as unknown as LegacyRef<HTMLLIElement>)
												: undefined
										}
										className="list-none"
										key={form.id}>
										<FormListItem form={form} />
									</li>
								)
							})}
						{formsList.length === 0 && !formsLoading && (
							<CreateForm>
								<div className="flex flex-col border justify-center items-center border-gray-600 rounded-md w-full space-x-4 p-4 h-[120px] cursor-pointer">
									<AiOutlineFileAdd className="w-6 h-6 mb-2" />
									<p className="text-sm text-muted-foreground">
										You don't have any forms yet. Click the button above to
										create one!
									</p>
								</div>
							</CreateForm>
						)}
						{formsList.length != 0 && formsLoading && (
							<Skeleton className="flex flex-col border justify-center items-center border-gray-600 rounded-md w-full space-x-4 p-4 h-[120px]" />
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Dashboard
