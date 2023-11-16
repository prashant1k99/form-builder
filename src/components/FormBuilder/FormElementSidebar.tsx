import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'

function FormElementSidebar() {
	return (
		<div className="w-full h-full">
			<p className="text-muted-foreground mb-2">Layout Elements</p>
			<div className="grid grid-cols-2 gap-2 items-center">
				<SidebarBtnElement formElement={FormElements.TitleField} />
				<SidebarBtnElement formElement={FormElements.SubTitleField} />
				<SidebarBtnElement formElement={FormElements.Paragraph} />
				<SidebarBtnElement formElement={FormElements.Separator} />
			</div>
			<br />
			<p className="text-muted-foreground mb-2">Form Elements</p>
			<div className="grid grid-cols-2 gap-2 items-center">
				<SidebarBtnElement formElement={FormElements.TextField} />
				<SidebarBtnElement formElement={FormElements.TextArea} />
				<SidebarBtnElement formElement={FormElements.NumberField} />
				<SidebarBtnElement formElement={FormElements.PhoneNumberField} />
				<SidebarBtnElement formElement={FormElements.EmailField} />
				<SidebarBtnElement formElement={FormElements.CheckBoxField} />
				<SidebarBtnElement formElement={FormElements.SelectField} />
				<SidebarBtnElement formElement={FormElements.DateField} />
				<SidebarBtnElement formElement={FormElements.RadioGroupField} />
			</div>
		</div>
	)
}

export default FormElementSidebar
