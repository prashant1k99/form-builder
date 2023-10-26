import { DragOverlay, useDndMonitor, Active } from '@dnd-kit/core'
import { useState } from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { ElementsType, FormElements } from './FormElements'

function DragOverlayWrapper() {
	const [draggedItem, setDraggedItem] = useState<Active | null>(null)
	useDndMonitor({
		onDragStart: (event) => {
			setDraggedItem(event.active)
			console.log('DRAG ITEM', event)
		},
		onDragCancel: () => {
			setDraggedItem(null)
		},
		onDragEnd: () => {
			setDraggedItem(null)
		},
	})

	if (!draggedItem) return null

	let node = <div>No Drag Overlay</div>
	const isSidebarBtnElement = draggedItem?.data.current.isDesignerBtnElement

	if (isSidebarBtnElement) {
		const type = draggedItem?.data.current.type as ElementsType
		node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
	}

	return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
