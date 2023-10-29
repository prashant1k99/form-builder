import { AiOutlineClose } from 'react-icons/ai'
import { FormElements } from './FormElements'
import useDesigner from '@/hooks/useDesigner'
import { Button } from '../ui/button'

function PropertiesFormSidebar() {
	const { selectedElement, setSelectedElement } = useDesigner()

	if (!selectedElement) return null

	const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent

	return (
		<div className="flex flex-col p-2">
			<div className="flex justify-between items-center">
				<p className="text-sm text-foreground/70">Element Properties</p>
				<Button
					size={'icon'}
					variant={'outline'}
					onClick={() => setSelectedElement(null)}>
					<AiOutlineClose className="h-4 w-4 text-foreground/70" />
				</Button>
			</div>
			<PropertiesForm elementInstance={selectedElement} />
		</div>
	)
}

export default PropertiesFormSidebar
