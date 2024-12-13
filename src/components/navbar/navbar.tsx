'use client';

import { useAppSelector } from '@/lib/redux/hook';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { IoGameController, IoLogOut, IoPowerOutline } from 'react-icons/io5';
import { SiGoogleanalytics } from 'react-icons/si';

export default function Navbar() {
	const [view, setView] = useState<ViewList>('main');
	const isShowNav = useAppSelector((state) => state.showNavFull);
	const router = useRouter();
	// Go page
	useEffect(() => {
		if (view !== 'main') {
			router.push(`/dashboard/${view}`);
		} else {
			router.push('/dashboard');
		}
	}, [view]);
	return (
		<div
			className={`${
				isShowNav ? 'w-[250px]' : 'w-[100px]'
			} min-h-screen lg:flex hidden flex-col justify-between bg-white backdrop-blur-md max-h-screen p-4 transition-all duration-300 ease-out z-[1000]`}>
			{/* Logo */}
			<div className="flex flex-row items-center justify-center gap-2 sticky top-0 z-[1000] p-3 font-protest-strike-regular">
				<div className="avatar">
					<div className="w-6 rounded-full">
						<img src="/image/icon/7.webp" />
					</div>
				</div>
				<h1 className={`${isShowNav ? 'text-xl' : 'hidden'}`}>hsgame.me</h1>
			</div>
			{/* Navbar */}
			<div
				className={`flex flex-col w-full items-start justify-start h-screen overflow-x-hidden overflow-y-auto`}>
				<ul className="flex flex-col text-lg w-full gap-2">
					<li
						className={`flex flex-col items-center justify-center px-2 ${
							view === 'main' ? 'border-l-2 rounded-sm border-[#4880FF]' : ''
						}`}>
						<button
							className={`${
								isShowNav ? 'w-[192px]' : 'w-fit'
							} flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
								view === 'main' ? 'bg-[#4880FF] text-white' : ''
							}`}
							onClick={() => setView('main')}>
							<SiGoogleanalytics size={24} />
							<p className={`${isShowNav ? '' : 'hidden'}`}>Dashboard</p>
						</button>
					</li>
					<li
						className={`flex flex-col items-center justify-center px-2 ${
							view === 'minigame'
								? 'border-l-2 rounded-sm border-[#4880FF]'
								: ''
						}`}>
						<button
							className={`${
								isShowNav ? 'w-[192px]' : 'w-fit'
							} flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
								view === 'minigame' ? 'bg-[#4880FF] text-white' : ''
							}`}
							onClick={() => setView('minigame')}>
							<IoGameController size={24} />
							<p className={`${isShowNav ? '' : 'hidden'}`}>Minigame</p>
						</button>
					</li>
					<li
						className={`flex flex-col items-center justify-center px-2 ${
							view === 'users' ? 'border-l-2 rounded-sm border-[#4880FF]' : ''
						}`}>
						<button
							className={`${
								isShowNav ? 'w-[192px]' : 'w-fit'
							} flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
								view === 'users' ? 'bg-[#4880FF] text-white' : ''
							}`}
							onClick={() => setView('users')}>
							<FaUsers size={24} />
							<p className={`${isShowNav ? '' : 'hidden'}`}>Người Chơi</p>
						</button>
					</li>
					<li
						className={`flex flex-col items-center justify-center px-2 ${
							view === 'service' ? 'border-l-2 rounded-sm border-[#4880FF]' : ''
						}`}>
						<button
							className={`${
								isShowNav ? 'w-[192px]' : 'w-fit'
							} flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
								view === 'service' ? 'bg-[#4880FF] text-white' : ''
							}`}
							onClick={() => setView('service')}>
							<FaShop size={24} />
							<p className={`${isShowNav ? '' : 'hidden'}`}>Giao Dịch</p>
						</button>
					</li>
					<li
						className={`flex flex-col items-center justify-center px-2 ${
							view === 'next' ? 'border-l-2 rounded-sm border-[#4880FF]' : ''
						}`}>
						<button
							className={`${
								isShowNav ? 'w-[192px]' : 'w-fit'
							} flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
								view === 'next' ? 'bg-[#4880FF] text-white' : ''
							}`}
							onClick={() => setView('next')}>
							<div className="avatar">
								<div className="w-6 rounded-full">
									<img src="/image/icon/s1.webp" />
								</div>
							</div>
							<p className={`${isShowNav ? '' : 'hidden'}`}>Money & Gem</p>
						</button>
					</li>
				</ul>
			</div>

			<button className="btn flex flex-row gap-2 items-center text-lg p-2 m-2 bg-[#4880FF] text-white hover:text-black">
				<IoPowerOutline size={24} />
				{`${isShowNav ? 'Đăng xuất' : ''}`}
			</button>
		</div>
	);
}
