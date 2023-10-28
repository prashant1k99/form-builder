import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImSpinner2 } from 'react-icons/im'
import Forms from '@/data/forms'
import z from 'zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormLabel,
	FormItem,
	FormField,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

const FormSchema = z.object({
	name: z.string().min(2).max(50),
	description: z.string().max(100),
})

type formSchemaType = z.infer<typeof FormSchema>

export default function CreateFormSheet({
	children,
}: {
	children: React.ReactNode
}) {
	const navigate = useNavigate()
	const { user } = useAuth()
	const formSettings = useForm<formSchemaType>({
		resolver: zodResolver(FormSchema),
		mode: 'onSubmit',
		defaultValues: {
			name: '',
			description: '',
		},
	})

	async function onSubmit(data: formSchemaType) {
		try {
			console.log('CREATING FORM: ', data)
			const { name, description } = data
			const form = await Forms.createForm(user.uid, {
				name,
				description,
			})
			navigate(`/builder/${form.id}`)
			// Navigate to the new form
		} catch (error) {
			console.error(error)
			toast({
				variant: 'destructive',
				title: 'Uh oh! Something went wrong.',
				description:
					error instanceof Error ? error.message : 'An unknown error occurred.',
				action: (
					<ToastAction
						altText="Try again"
						onClick={(e) => {
							e.preventDefault()
							onSubmit(data)
						}}>
						Try again
					</ToastAction>
				),
			})
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{children}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create Form</DialogTitle>
				</DialogHeader>
				<Form {...formSettings}>
					<form
						onSubmit={formSettings.handleSubmit(onSubmit)}
						className="space-y-5 py-6">
						<FormField
							key="name"
							control={formSettings.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Form Name</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="name"
											onKeyDown={(e) => {
												if (e.key == 'Enter')
													(e.target as HTMLInputElement).blur()
											}}
										/>
									</FormControl>
									<FormDescription>
										This name will be displayed on the form. <br />
										It is only used for identification purposes. <br />
										<b>It will not be displayed to your users</b>
										<br />
										You can change this later.
									</FormDescription>
								</FormItem>
							)}
						/>

						<FormField
							key="description"
							control={formSettings.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Form Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											placeholder="Form Description"
											onKeyDown={(e) => {
												if (e.key == 'Enter')
													(e.target as HTMLInputElement).blur()
											}}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						onClick={formSettings.handleSubmit(onSubmit)}
						disabled={formSettings.formState.isSubmitting}
						className="w-full mt-4">
						{!formSettings.formState.isSubmitting && <span>Save</span>}
						{formSettings.formState.isSubmitting && (
							<ImSpinner2 className="animate-spin" />
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
