import { Button } from './ui/button'
import { MdPreview } from 'react-icons/md'

function PreviewDialogBtn() {
	return (
		<Button>
			<MdPreview className="h-6 w-6 mr-2" />
			Preview
		</Button>
	)
}

export default PreviewDialogBtn
