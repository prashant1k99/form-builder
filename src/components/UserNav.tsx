import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LiaSignOutAltSolid } from 'react-icons/lia'
import useAuth from '@/hooks/useAuth'

export function UserNav() {
	const { user, signOut } = useAuth()
	return (
		user.email && (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="relative h-8 w-8 rounded-full">
						<Avatar className="h-8 w-8">
							<AvatarImage
								src={user.photoURL!}
								alt={user.displayName + ' profile photo'}
							/>
							<AvatarFallback>{user.displayName}</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56" align="end" forceMount>
					<DropdownMenuLabel className="font-normal">
						<div className="flex flex-col space-y-1">
							<p className="text-sm font-medium leading-none">
								{user.displayName}
							</p>
							<p className="text-xs leading-none text-muted-foreground">
								{user.email}
							</p>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						className="text-red-400 hover:bg-red-500 hover:text-white"
						onClick={(e) => {
							e.preventDefault()
							signOut()
						}}>
						Log out
						<LiaSignOutAltSolid className="w-4 h-4 ml-auto" />
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	)
}
