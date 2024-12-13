'use client';

interface ConfigModal {
	id: string;
	children: React.ReactNode;
	customClass?: string;
	heading?: string;
}

function NoticeModel({
	id,
	customClass,
	children,
	heading = 'Thông Báo',
}: ConfigModal) {
	return (
		<dialog
			id={id}
			className="modal p-2 x-[1200]">
			<div
				className={`modal-box ${
					customClass ?? 'none'
				} font-chakra-petch backdrop-blur-lg z-[1200]`}>
				<form method="dialog">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-[1200]">
						✕
					</button>
				</form>

				<div className="flex flex-col gap-5">
					<h1 className="text-xl">{heading}</h1>
					{children}
				</div>
			</div>
			<form
				method="dialog"
				className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}

export default NoticeModel;
