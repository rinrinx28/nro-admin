import type { Metadata, Viewport } from 'next';
import './globals.css';
import Providers from '@/lib/redux/Provider';

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	// Also supported by less commonly used
	// interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
	title: 'Login DashBoard Admin',
	description: 'Power by Rin',
	icons: '/image/icon/1.webp',
	openGraph: {
		type: 'website',
		countryName: 'vi',
		title: 'Login Admin',
		siteName: 'login',
		description: 'Đăng nhập trang Dashboard',
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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Protest+Strike&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.cdnfonts.com/css/michelangelo"
				/>
				<link
					href="https://fonts.cdnfonts.com/css/sf-transrobotics-2"
					rel="stylesheet"
				/>
				<link
					href="https://fonts.cdnfonts.com/css/neue-helvetica-bq"
					rel="stylesheet"></link>
				<link
					href="https://fonts.cdnfonts.com/css/dynotherm"
					rel="stylesheet"
				/>
			</head>
			<body
				className={``}
				data-theme="luxury">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
