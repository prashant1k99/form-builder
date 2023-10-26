import Designer from './Designer'

function FormBuilder() {
	return (
		<main className="flex w-full flex-grow mx-auto h-[200px] bg-accent bg-[url(@/assets/circuit-board.svg)] dark:bg-[url(@/assets/circuit-board-dark.svg)]">
			<div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto">
				<Designer />
			</div>
		</main>
	)
}

export default FormBuilder
