import { LiaCubesSolid } from 'react-icons/lia'
import { PiGearSix } from 'react-icons/pi'
import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import FormSettings from '../FormSettings'

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
					<SidebarBtnElement formElement={FormElements.TextArea} />
					<SidebarBtnElement formElement={FormElements.NumberField} />
					<SidebarBtnElement formElement={FormElements.PhoneNumberField} />
					<SidebarBtnElement formElement={FormElements.EmailField} />
					<SidebarBtnElement formElement={FormElements.CheckBoxField} />
				</div>
			</TabsContent>
			<TabsContent value="settings">
				<p className="text-muted-foreground mb-2">Form Settings</p>
				<div className="flex flex-col gap-2 items-center mb-4">
					<FormSettings />
				</div>
			</TabsContent>
		</Tabs>
	)
}

export default FormElementSidebar
