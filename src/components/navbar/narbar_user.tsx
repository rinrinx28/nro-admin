'use client';

import { useAppSelector } from '@/lib/redux/hook';
import { use } from 'react';
import { FaAlignLeft, FaUsers } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { IoGameController, IoLogOut } from 'react-icons/io5';
import { SiGoogleanalytics } from 'react-icons/si';

export default function NavbarUser() {
	const user = useAppSelector((state) => state.user);
	return (
		<div className="w-full flex flex-row-reverse justify-between items-center bg-white/5 backdrop-blur-md font-protest-strike-regular px-2 sticky top-0">
			{/* Logo */}
			<div className="flex flex-row items-center gap-2 sticky top-0 z-[1000] p-2">
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn bg-transparent border-0 hover:bg-transparent">
						<div className="avatar">
							<div className="w-12 rounded-full">
								<img
									src={`/image/avatar/${user?.meta?.avatar ?? '3'}.webp`}
									alt="logo user admin"
								/>
							</div>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content menu bg-base-100 rounded-box z-[1] w-fit p-2 shadow">
						<li>
							<div className="flex flex-row items-center gap-2">
								<div className="avatar">
									<div className="w-12 rounded-full">
										<img
											src={`/image/avatar/${user?.meta?.avatar ?? '3'}.webp`}
											alt="logo user admin"
										/>
									</div>
								</div>
								<div className="flex flex-col">
									<p>{user.name}</p>
									<p>{user.email ?? 'rindev@gmail.com'}</p>
									<div className="flex flex-row gap-1 items-center">
										<div className="avatar">
											<div className="w-6 rounded-full">
												<img
													src={`/image/icon/s1.webp`}
													alt="icon money cash"
												/>
											</div>
										</div>
										<p>{new Intl.NumberFormat('vi').format(user.money ?? 0)}</p>
									</div>
								</div>
							</div>
						</li>
						<li className="lg:hidden">
							<button className="btn flex flex-row gap-2 items-center text-lg p-2 m-2">
								<IoLogOut size={24} />
								Đăng Xuất
							</button>
						</li>
					</ul>
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
						<FaAlignLeft size={24} />
					</label>
				</div>
				<div className="drawer-side z-[1050] ">
					<label
						htmlFor="my-drawer"
						aria-label="close sidebar"
						className="drawer-overlay"></label>
					{/* Logo */}
					<div className="bg-base-200 text-base-content min-h-full w-80 h-screen overflow-auto">
						<div className="flex flex-row items-center gap-2 sticky top-0 bg-base-200 z-[1000] p-4">
							<div className="avatar">
								<div className="w-12 rounded-full">
									<img src="/image/icon/7.webp" />
								</div>
							</div>
							<h1 className="text-xl">nrogame.me</h1>
						</div>
						<ul className="menu p-4">
							<li>
								<div>
									<SiGoogleanalytics size={24} />
									<p>Dashboard</p>
								</div>
							</li>
							<li>
								<div>
									<IoGameController size={24} />
									<p>Minigame</p>
								</div>
							</li>
							<li>
								<div>
									<FaUsers size={24} />
									<p>Người Chơi</p>
								</div>
							</li>
							<li>
								<div>
									<FaShop size={24} />
									<p>Giao Dịch</p>
								</div>
							</li>
							<li>
								<div>
									<div className="avatar">
										<div className="w-8 rounded-full">
											<img src="/image/icon/s1.webp" />
										</div>
									</div>
									<p>Money & Gem</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
