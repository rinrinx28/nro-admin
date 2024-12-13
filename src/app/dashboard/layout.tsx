import NavbarUser from '@/components/navbar/narbar_user';
import Navbar from '@/components/navbar/navbar';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export const metadata: Metadata = {
	title: 'HSGAME | Dashboard Admin',
	description: 'Powered by Rin',
	icons: 'https://admin.hsgame.me/image/icon/7.webp',
	openGraph: {
		type: 'website',
		countryName: 'vi',
		title: 'Admin',
		siteName: 'dashboard',
		description: 'Trang quản trị website',
		images: 'https://admin.hsgame.me/image/logo_login.webp',
	},
	formatDetection: {
		address: false,
		date: false,
		email: false,
		telephone: false,
		url: false,
	},
};

export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-row items-start justify-start bg-[#F5F6FA]">
			<Navbar />
			<div className="flex flex-col gap-2 w-full h-screen overflow-auto">
				<NavbarUser />
				{children}
			</div>
		</div>
	);
}
