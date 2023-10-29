import { Button } from './ui/button'
import { BiCloudUpload } from 'react-icons/bi'

function PublishBtn() {
	return (
		<Button variant={'default'}>
			<BiCloudUpload className="h-6 w-6 mr-2" />
			Publish
		</Button>
	)
}

export default PublishBtn
