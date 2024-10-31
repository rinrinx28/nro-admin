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
	title: 'DashBoard Admin | NRO',
	description: 'Power by Rin',
	icons: '/image/icon/7.webp',
	openGraph: {
		type: 'website',
		countryName: 'vi',
		title: 'Admin',
		siteName: 'dashboard',
		description: 'Trang quản trị website',
		images: '/image/logo_login.webp',
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
		<div className="flex flex-row items-start justify-start">
			<Navbar />
			<div className="flex flex-col gap-2 w-full h-screen overflow-auto">
				<NavbarUser />
				{children}
			</div>
		</div>
	);
}
