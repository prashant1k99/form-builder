import { useDraggable } from '@dnd-kit/core'
import { FormElement } from './FormElements'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
	const { icon: Icon, label } = formElement.designerBtnElement
	const dragable = useDraggable({
		id: `designer-btn-${formElement.type}`,
		data: {
			type: formElement.type,
			construct: formElement.construct,
			isDesignerBtnElement: true,
		},
	})
	return (
		<Button
			ref={dragable.setNodeRef}
			variant={'outline'}
			className={cn(
				'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
				dragable.isDragging && 'ring-2 ring-primary'
			)}
			{...dragable.listeners}
			{...dragable.attributes}>
			<Icon className="h-8 w-8 text-primary cursor-grab" />
			<p className="text-xs">{label}</p>
		</Button>
	)
}

export function SidebarBtnElementDragOverlay({
	formElement,
}: {
	formElement: FormElement
}) {
	const { icon: Icon, label } = formElement.designerBtnElement
	return (
		<Button
			variant={'outline'}
			className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
			<Icon className="h-8 w-8 text-primary cursor-grab" />
			<p className="text-xs">{label}</p>
		</Button>
	)
}

export default SidebarBtnElement
