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
				<SidebarBtnElement formElement={FormElements.TextField} />
			</TabsContent>
			<TabsContent value="settings">Form Properties</TabsContent>
		</Tabs>
	)
}

export default FormElementSidebar
