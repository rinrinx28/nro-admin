'use client';

import { FaUsers } from 'react-icons/fa';
import { FaShop } from 'react-icons/fa6';
import { IoGameController, IoLogOut } from 'react-icons/io5';
import { SiGoogleanalytics } from 'react-icons/si';

export default function Navbar() {
	return (
		<div className="max-w-sm w-full min-h-screen lg:flex hidden flex-col justify-between bg-white/10 backdrop-blur-md font-protest-strike-regular max-h-screen">
			{/* Logo */}
			<div className="flex flex-row items-center gap-2 sticky top-0 bg-base-200 z-[1000] p-3">
				<div className="avatar">
					<div className="w-12 rounded-full">
						<img src="/image/icon/7.webp" />
					</div>
				</div>
				<h1 className="text-xl">nrogame.me</h1>
			</div>
			{/* Navbar */}
			<div className="flex flex-col w-full items-start justify-start h-screen overflow-auto">
				<ul className="menu text-lg  w-full">
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

			<button className="btn flex flex-row gap-2 items-center text-lg p-2 m-2">
				<IoLogOut size={24} />
				Đăng Xuất
			</button>
		</div>
	);
}
