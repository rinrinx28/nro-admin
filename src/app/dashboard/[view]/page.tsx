'use client';

import Minigame from '@/components/minigame';
import MoneyFlow from '@/components/moneyFlow';
import ServiceController from '@/components/serviceController';
import UserController from '@/components/userController';
import { useAppSelector } from '@/lib/redux/hook';

export default function Dashboard({ params }: { params: { view: ViewList } }) {
	const user = useAppSelector((state) => state.user);
	const { view } = params;
	return (
		<div className="flex flex-col items-center justify-center font-protest-strike-regular">
			<div className="flex flex-col gap-8 row-start-2 items-center justify-center w-full rounded-lg">
				<h1 className="">
					Hi {user.name} - View {view}
				</h1>
				{view === 'minigame' && <Minigame />}
				{view === 'users' && <UserController />}
				{view === 'service' && <ServiceController />}
				{view === 'next' && <MoneyFlow />}
			</div>
		</div>
	);
}
