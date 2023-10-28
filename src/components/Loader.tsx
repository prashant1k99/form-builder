import { ImSpinner2 } from 'react-icons/im'

function Loader() {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<ImSpinner2 className="animate-spin h-12 w-12" />
		</div>
	)
}

export default Loader
