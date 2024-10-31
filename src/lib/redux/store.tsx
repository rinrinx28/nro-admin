import { configureStore } from '@reduxjs/toolkit';
import server from './storage/minigame/server';
import Clans from './storage/clan/clans';
import inviteClans from './storage/clan/invite';
import msgClan from './storage/clan/msgClan';
import Bots from './storage/eshop/bots';
import eConfig from './storage/eshop/config';
import services from './storage/eshop/service';
import Minigame from './storage/minigame/minigame';
import messages from './storage/user/message';
import user from './storage/user/user';
import userActives from './storage/user/userActive';
import userBets from './storage/user/userBet';
import users from './storage/user/users';
import finger from './storage/user/finger';
import jackpot from './storage/minigame/jackpot';
import userTop from './storage/top/userTop';
import clanTop from './storage/top/clanTop';

export const makeStore = () => {
	return configureStore({
		reducer: {
			server: server,
			clans: Clans,
			invites: inviteClans,
			msgClans: msgClan,
			bots: Bots,
			econfig: eConfig,
			services: services,
			minigame: Minigame,
			messages: messages,
			user: user,
			users: users,
			userActives: userActives,
			userBets: userBets,
			finger: finger,
			jackpot: jackpot,
			userTop: userTop,
			clanTop: clanTop,
		},
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
