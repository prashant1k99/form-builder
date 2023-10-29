import { Button } from './ui/button'
import { BiSolidSave } from 'react-icons/bi'
import useForms from '@/hooks/useForms'
import useDesigner from '@/hooks/useDesigner'
import { Form } from '@/types/forms'

function FormSaveBtn() {
	const { form, saveForm, isSaving } = useForms()
	const { elements } = useDesigner()

	return (
		<Button
			variant={'ghost'}
			disabled={isSaving}
			onClick={(e) => {
				e.preventDefault()
				saveForm({
					form: form as Form,
					elements,
				})
			}}>
			<BiSolidSave className="h-6 w-6 mr-2" />
			Save
		</Button>
	)
}

export default FormSaveBtn
