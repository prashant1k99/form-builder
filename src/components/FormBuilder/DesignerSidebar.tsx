import { ScrollArea } from '@/components/ui/scroll-area'
import FormElementSidebar from './FormElementSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'
import useDesigner from '@/hooks/useDesigner'

function DesignerSidebar() {
	const { selectedElement } = useDesigner()
	return (
		<ScrollArea className="flex flex-grow gap-2 border-muted overflow-y-auto p-4 bg-background w-[400px] max-w-[400px]">
			{!selectedElement && <FormElementSidebar />}
			{selectedElement && <PropertiesFormSidebar />}
		</ScrollArea>
	)
}

export default DesignerSidebar
