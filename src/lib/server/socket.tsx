'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import moment from 'moment';
import { useAppDispatch } from '../redux/hook';
import { MiniGame, setMinigame } from '../redux/storage/minigame/minigame';
import { User } from '../redux/storage/user/user';
import { setUserStore } from '../redux/storage/user/users';
import { Bot, setBot } from '../redux/storage/eshop/bots';
import { Message, setMessage } from '../redux/storage/user/message';
import { setUserBet, UserBet } from '../redux/storage/user/userBet';
import { Clan, removeClan, setClan } from '../redux/storage/clan/clans';
import {
	InviteClan,
	removeInviteClan,
	setInviteClan,
} from '../redux/storage/clan/invite';
import { MsgClan, setMsgClan } from '../redux/storage/clan/msgClan';
import { Service, setService } from '../redux/storage/eshop/service';
import { updateJackpot } from '../redux/storage/minigame/jackpot';
moment().format();

const urlConfig = {
	dev: 'http://localhost:3037',
	vps: 'http://144.126.145.81:3037',
	sv: 'https://api.nrogame.me',
};

const socket: Socket = io(urlConfig.sv, {
	path: '/socket.io/',
	transports: ['websocket'],
	secure: true,
	reconnectionAttempts: 5, // Limit reconnection attempts
});

const SocketContext = createContext<Socket | null>(null);

export const useSocket = (): Socket => {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error('useSocket must be used within a SocketProvider');
	}
	return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		socket.connect();

		socket.on('bot.status', (payload: Bot) => {
			dispatch(setBot(payload));
		});

		socket.on(
			'mini.bet',
			(payload: {
				n_game?: MiniGame;
				data_user?: User[];
				userBets?: UserBet[];
			}) => {
				const { n_game, data_user, userBets } = payload;
				if (n_game) {
					dispatch(setMinigame(n_game));
				}
				if (data_user) {
					for (const user of data_user) {
						dispatch(setUserStore(user));
					}
				}
				if (userBets) {
					for (const bet of userBets) {
						dispatch(setUserBet(bet));
					}
				}
			},
		);

		socket.on('user.update', (payload: User) => {
			dispatch(setUserStore(payload));
		});

		socket.on('service.update', (payload: Service) => {
			dispatch(setService(payload));
		});

		socket.on('user.chat', (payload: any) => {
			const { status, msg }: { status: boolean; msg: Message } = payload;
			if (status) {
				dispatch(setMessage(msg));
			}
		});

		socket.on('user.chat.clan', (payload: any) => {
			const { status, msg }: { status: boolean; msg: MsgClan } = payload;
			if (status) {
				dispatch(setMsgClan(msg));
			}
		});

		socket.on('message.re', (payload: Message) => {
			dispatch(setMessage(payload));
		});

		socket.on('userbet.update', (payload: UserBet) => {
			dispatch(setUserBet(payload));
		});

		socket.on('clan.update', (payload: Clan) => {
			dispatch(setClan(payload));
		});

		socket.on('clan.update.remove', (payload: string) => {
			dispatch(removeClan(payload));
		});

		socket.on('user.update.bulk', (payload: User[]) => {
			for (const user of payload) {
				dispatch(setUserStore(user));
			}
		});

		socket.on('invite.update', (payload: InviteClan) => {
			dispatch(setInviteClan(payload));
		});

		socket.on('invite.remove', (payload: string) => {
			dispatch(removeInviteClan(payload));
		});

		socket.on('jackpot.update', (payload: any) => {
			dispatch(updateJackpot(payload));
		});

		// get jackpot;
		socket.emit('jackpot.get', 'jackpot');

		return () => {
			socket.disconnect();
			socket.off('bot.status');
			socket.off('mini.bet');
			socket.off('user.update');
			socket.off('service.update');
			socket.off('user.chat');
			socket.off('user.chat.clan');
			socket.off('userbet.update');
			socket.off('clan.update');
			socket.off('clan.update.remove');
			socket.off('user.update.bulk');
			socket.off('invite.update');
			socket.off('invite.remove');
			socket.off('jackpot.update');
		};
	}, [dispatch]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};
