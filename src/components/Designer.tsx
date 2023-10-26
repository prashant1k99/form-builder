import { useState } from 'react'
import {
	DragEndEvent,
	useDndMonitor,
	useDraggable,
	useDroppable,
} from '@dnd-kit/core'
import DesignerSidebar from './DesignerSidebar'
import { cn } from '@/lib/utils'
import useDesigner from './hooks/useDesigner'
import { ElementsType, FormElementInstance, FormElements } from './FormElements'
import idGenerator from '@/lib/idGenderator'
import { Button } from './ui/button'
import { MdDelete } from 'react-icons/md'

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
	const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)
	const { removeElement, setSelectedElement } = useDesigner()

	const topHalf = useDroppable({
		id: `${element.id}-top`,
		data: {
			type: element.type,
			elementId: element.id,
			isTopHalfDesignerElement: true,
		},
	})

	const bottomHalf = useDroppable({
		id: `${element.id}-bottom`,
		data: {
			type: element.type,
			elementId: element.id,
			isTopHalfDesignerElement: true,
		},
	})

	const draggable = useDraggable({
		id: element.id + '-drag-handle',
		data: {
			type: element.type,
			elementId: element.id,
			isDesignerElement: true,
		},
	})

	if (draggable.isDragging) return null

	const DesignerElement = FormElements[element.type].designerComponent
	return (
		<div
			ref={draggable.setNodeRef}
			{...draggable.attributes}
			{...draggable.listeners}
			className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-insert"
			onMouseEnter={() => setMouseIsOver(true)}
			onClick={(e) => {
				e.stopPropagation()
				setSelectedElement(element)
			}}
			onMouseLeave={() => setMouseIsOver(false)}>
			<div
				ref={topHalf.setNodeRef}
				className="absolute w-full h-1/2 rounded-t-md"></div>
			<div
				ref={bottomHalf.setNodeRef}
				className="absolute bottom-0 w-full h-1/2 rounded-b-md"></div>
			{mouseIsOver && (
				<>
					<div className="absolute right-0 h-full">
						<Button
							onClick={(e) => {
								e.stopPropagation()
								setSelectedElement(null)
								removeElement(element.id)
							}}
							className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500">
							<MdDelete className="h-6 w-6 text-accent" />
						</Button>
					</div>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
						<p className="text-muted-foreground text-sm">
							Click For properties
						</p>
					</div>
				</>
			)}
			{topHalf.isOver && (
				<div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none"></div>
			)}
			<div
				className={cn(
					'flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none',
					mouseIsOver && 'opacity-20'
				)}>
				<DesignerElement elementInstance={element} />
			</div>
			{bottomHalf.isOver && (
				<div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none"></div>
			)}
		</div>
	)
}

function Designer() {
	const { elements, addElement, selectedElement, setSelectedElement } =
		useDesigner()

	const droppable = useDroppable({
		id: 'designer-drop-area',
		data: {
			isDesignDropArea: true,
		},
	})

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			console.log('DRAG END', event)
			const { active, over } = event
			if (!active || !over) return

			if (!active?.data?.current) return

			const isDesignerBtnElement = active?.data?.current.isDesignerBtnElement

			if (isDesignerBtnElement) {
				const type = active.data.current.type as ElementsType
				const newElement = FormElements[type].construct(idGenerator(type))

				addElement(elements.length, newElement)
			}
		},
	})

	return (
		<div className="flex w-full h-full">
			<div
				className="p-4 w-full"
				onClick={(e) => {
					e.stopPropagation()
					if (selectedElement) setSelectedElement(null)
				}}>
				<div
					ref={droppable.setNodeRef}
					className={cn(
						'bg-background max-w-[920px] p-4 h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1',
						droppable.isOver && 'ring-2 ring-primary/20'
					)}>
					{!droppable.isOver && elements.length == 0 && (
						<p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
							Drop Here
						</p>
					)}
					{elements.length > 0 && (
						<div className="flex flex-col w-full gap-6 p-4">
							{elements.map((element: FormElementInstance) => (
								<DesignerElementWrapper
									key={element.id}
									element={element}></DesignerElementWrapper>
							))}
						</div>
					)}
					{droppable.isOver && elements.length == 0 && (
						<div className="p-4 w-full">
							<div className="h-[120px] rounded-md bg-primary/20"></div>
						</div>
					)}
				</div>
			</div>
			<DesignerSidebar />
		</div>
	)
}

export default Designer
