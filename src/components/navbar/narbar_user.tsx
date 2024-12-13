'use client';

import { useAppDispatch, useAppSelector } from '@/lib/redux/hook';
import { setIsShowNavFull } from '@/lib/redux/storage/navbar/navbar';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { FaAlignLeft, FaUsers } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { IoGameController, IoLogOut, IoPowerOutline } from 'react-icons/io5';
import { LuListMinus } from 'react-icons/lu';
import { SiGoogleanalytics } from 'react-icons/si';

export default function NavbarUser() {
	const [view, setView] = useState<ViewList>('main');
	const user = useAppSelector((state) => state.user);
	const isShowNav = useAppSelector((state) => state.showNavFull);
	const dispatch = useAppDispatch();
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
		<div className="w-full flex flex-row-reverse justify-between items-center bg-white backdrop-blur-md font-chakra-petch px-4 py-2 sticky top-0 z-10">
			{/* Logo */}
			<div className="flex flex-row items-center gap-2 sticky top-0 z-[1000] p-2">
				<div className="avatar">
					<div className="w-12 rounded-full">
						<img
							src={`/image/avatar/${user?.avatar ?? '3'}.webp`}
							alt="logo user admin"
						/>
					</div>
				</div>
				<div className="font-protest-strike-regular text-nowrap">
					<h2>{user.name}</h2>
					<h3 className="font-chakra-petch">Admin</h3>
				</div>
			</div>
			{/* Draw */}
			<div className="drawer lg:hidden inline-flex">
				<input
					id="my-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content place-items-center">
					{/* Page content here */}
					<label
						htmlFor="my-drawer"
						className="btn btn-ghost">
						<LuListMinus size={24} />
					</label>
				</div>
				<div className="drawer-side z-[1050]">
					<label
						htmlFor="my-drawer"
						aria-label="close sidebar"
						className="drawer-overlay"></label>
					<div className="min-h-screen flex flex-col justify-between bg-white backdrop-blur-md max-h-screen p-4 transition-all z-[1050]">
						{/* Logo */}
						<div className="flex flex-row items-center justify-center gap-2 sticky top-0 z-[1000] p-3 font-protest-strike-regular">
							<div className="avatar">
								<div className="w-6 rounded-full">
									<img src="/image/icon/7.webp" />
								</div>
							</div>
							<h1 className={`text-xl`}>nrogame.me</h1>
						</div>
						{/* Navbar */}
						<div
							className={`flex flex-col w-full items-start justify-start h-screen overflow-auto`}>
							<ul className="flex flex-col text-lg w-full gap-2">
								<li
									className={`flex flex-col items-center justify-center px-2 ${
										view === 'main'
											? 'border-l-2 rounded-sm border-[#4880FF]'
											: ''
									}`}>
									<button
										className={`w-[192px] flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
											view === 'main' ? 'bg-[#4880FF] text-white' : ''
										}`}
										onClick={() => setView('main')}>
										<SiGoogleanalytics size={24} />
										<p>Dashboard</p>
									</button>
								</li>
								<li
									className={`flex flex-col items-center justify-center px-2 ${
										view === 'minigame'
											? 'border-l-2 rounded-sm border-[#4880FF]'
											: ''
									}`}>
									<button
										className={`w-[192px] flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
											view === 'minigame' ? 'bg-[#4880FF] text-white' : ''
										}`}
										onClick={() => setView('minigame')}>
										<IoGameController size={24} />
										<p>Minigame</p>
									</button>
								</li>
								<li
									className={`flex flex-col items-center justify-center px-2 ${
										view === 'users'
											? 'border-l-2 rounded-sm border-[#4880FF]'
											: ''
									}`}>
									<button
										className={`w-[192px] flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
											view === 'users' ? 'bg-[#4880FF] text-white' : ''
										}`}
										onClick={() => setView('users')}>
										<FaUsers size={24} />
										<p>Người Chơi</p>
									</button>
								</li>
								<li
									className={`flex flex-col items-center justify-center px-2 ${
										view === 'service'
											? 'border-l-2 rounded-sm border-[#4880FF]'
											: ''
									}`}>
									<button
										className={`w-[192px] flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
											view === 'service' ? 'bg-[#4880FF] text-white' : ''
										}`}
										onClick={() => setView('service')}>
										<FaShop size={24} />
										<p>Giao Dịch</p>
									</button>
								</li>
								<li
									className={`flex flex-col items-center justify-center px-2 ${
										view === 'next'
											? 'border-l-2 rounded-sm border-[#4880FF]'
											: ''
									}`}>
									<button
										className={`w-[192px] flex flex-row items-center justify-start gap-2 p-2 rounded-xl hover:bg-[#4880FF] hover:text-white hover:duration-300 ${
											view === 'next' ? 'bg-[#4880FF] text-white' : ''
										}`}
										onClick={() => setView('next')}>
										<div className="avatar">
											<div className="w-6 rounded-full">
												<img src="/image/icon/s1.webp" />
											</div>
										</div>
										<p>Money & Gem</p>
									</button>
								</li>
							</ul>
						</div>
						<button className="btn flex flex-row gap-2 items-center text-lg p-2 m-2 bg-[#4880FF] text-white hover:text-black">
							<IoPowerOutline size={24} />
							Đăng xuất
						</button>
					</div>
				</div>
			</div>

			<div className="lg:flex hidden flex-row gap-6 max-w-2xl w-full">
				<button onClick={() => dispatch(setIsShowNavFull(!isShowNav))}>
					<LuListMinus size={24} />
				</button>
			</div>
		</div>
	);
}
