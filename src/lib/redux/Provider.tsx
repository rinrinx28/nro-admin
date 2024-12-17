'use client';
import { useRef, useEffect } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { setServer } from './storage/minigame/server';
import { updateUser } from './storage/user/user';
import apiClient from '../server/apiClient';
import { useAppDispatch } from './hook';
import { setBots } from './storage/eshop/bots';
import { setClans } from './storage/clan/clans';
import { setInviteClans } from './storage/clan/invite';
import { setMsgClans } from './storage/clan/msgClan';
import { setConfigs } from './storage/eshop/config';
import { setServices } from './storage/eshop/service';
import { setMinigames } from './storage/minigame/minigame';
import { setMessages } from './storage/user/message';
import { setUserActives } from './storage/user/userActive';
import { setUserBets } from './storage/user/userBet';
import { setUserStores } from './storage/user/users';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { setFinger } from './storage/user/finger';
import { useRouter } from 'next/navigation';
import { setIsShowNavFull } from './storage/navbar/navbar';

export default function StoreProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
	}
	storeRef.current.dispatch(setBots([]));
	storeRef.current.dispatch(setClans([]));
	storeRef.current.dispatch(setInviteClans([]));
	storeRef.current.dispatch(setMsgClans([]));
	storeRef.current.dispatch(setConfigs([]));
	storeRef.current.dispatch(setServices([]));
	storeRef.current.dispatch(setMinigames([]));
	storeRef.current.dispatch(setMessages([]));
	storeRef.current.dispatch(setUserActives([]));
	storeRef.current.dispatch(setUserBets([]));
	storeRef.current.dispatch(setUserStores([]));
	const router = useRouter();

	useEffect(() => {
		window.scrollTo(0, 0); // Scroll to top when the page reloads
	}, []); // Empty dependency array means it runs once when the component mounts

	// Auto Save fingerprintJS and reload;
	useEffect(() => {
		const setFp = async (token: string) => {
			apiClient
				.get('/auth/relogin', {
					headers: {
						Authorization: 'Bearer ' + token,
					},
				})
				.then((res) => {
					const { role } = res.data;
					if (role !== '0') {
						storeRef.current?.dispatch(
							updateUser({ ...res.data, isLogin: true, token: token }),
						);
						router.push('/dashboard/minigame');
					} else throw new Error('Bạn không đủ quyền hạn');
				})
				.catch((err) => {
					localStorage.removeItem('access_token');
					router.push('/');
				});
		};
		const token = localStorage.getItem('access_token');
		// relogin
		if (token) {
			setFp(token);
		}

		// Setup Default Nav status
		let isShow = localStorage.getItem('isShowNav');
		if (!isShow) {
			storeRef.current?.dispatch(setIsShowNavFull(false));
		} else {
			if (isShow === 'false') {
				storeRef.current?.dispatch(setIsShowNavFull(false));
			} else {
				storeRef.current?.dispatch(setIsShowNavFull(true));
			}
		}
		return () => {};
	}, [router, storeRef]);

	return <Provider store={storeRef.current}>{children}</Provider>;
}
