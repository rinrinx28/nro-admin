'use client';

import { useAppSelector } from '@/lib/redux/hook';

export default function Dashboard() {
	const user = useAppSelector((state) => state.user);
	return (
		<div className="flex flex-col items-center justify-center font-protest-strike-regular">
			<div className="flex flex-col gap-8 row-start-2 items-center sm:items-start h-96">
				<h1 className="">Hi {user.name}</h1>
			</div>
		</div>
	);
}
