import { LiaCubesSolid } from 'react-icons/lia'
import { PiGearSix } from 'react-icons/pi'
import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function FormElementSidebar() {
	return (
		<Tabs defaultValue="elements" className="w-full h-full">
			<TabsList className="grid w-full grid-cols-2 mb-4">
				<TabsTrigger value="elements">
					<LiaCubesSolid className="w-4 h-4 mr-2" />
					Elements
				</TabsTrigger>
				<TabsTrigger value="settings">
					<PiGearSix className="w-4 h-4 mr-2" />
					Settings
				</TabsTrigger>
			</TabsList>
			<TabsContent value="elements">
				<p className="text-muted-foreground mb-2">Layout Elements</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
					<SidebarBtnElement formElement={FormElements.TitleField} />
					<SidebarBtnElement formElement={FormElements.SubTitleField} />
					<SidebarBtnElement formElement={FormElements.Paragraph} />
					<SidebarBtnElement formElement={FormElements.Separator} />
				</div>
				<br />
				<p className="text-muted-foreground mb-2">Form Elements</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
					<SidebarBtnElement formElement={FormElements.TextField} />
				</div>
			</TabsContent>
			<TabsContent value="settings">Form Properties</TabsContent>
		</Tabs>
	)
}

export default FormElementSidebar
