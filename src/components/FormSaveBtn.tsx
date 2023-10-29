import { Button } from './ui/button'
import { BiSolidSave } from 'react-icons/bi'

function FormSaveBtn() {
	return (
		<Button variant={'ghost'}>
			<BiSolidSave className="h-6 w-6 mr-2" />
			Save
		</Button>
	)
}

export default FormSaveBtn
