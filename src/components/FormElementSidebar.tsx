import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'

function FormElementSidebar() {
	return (
		<>
			Elements
			<SidebarBtnElement formElement={FormElements.TextField} />
		</>
	)
}

export default FormElementSidebar
