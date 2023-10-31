import FormElementSidebar from './FormElementSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'
import useDesigner from '@/hooks/useDesigner'

function DesignerSidebar() {
	const { selectedElement } = useDesigner()
	return (
		<aside className="flex flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto sm:h-full min-h-1/2 md:w-[400px] md:max-w-[400px] w-full">
			{!selectedElement && <FormElementSidebar />}
			{selectedElement && <PropertiesFormSidebar />}
		</aside>
	)
}

export default DesignerSidebar
