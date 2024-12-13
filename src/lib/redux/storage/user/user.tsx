import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface User {
	_id?: string;
	__v?: number;
	username?: string;
	pwd_h?: string;
	email?: string;
	name?: string;
	gold?: number;
	diamon?: number;
	clan?: string;
	totalBet?: number;
	limitedTrade?: number;
	trade?: number;
	isBan?: boolean;
	isReason?: string;
	server?: string;
	ip_address?: string;
	avatar?: string;
	type?: string;
	vip?: number;
	totalBank?: number;
	totalClan?: number;
	deposit?: number;
	withdraw?: number;
	createdAt?: Date;
	updatedAt?: Date;
	token?: string;
	isLogin: boolean;
}

// Define the initial state using that type
const initialState: User = { isLogin: false };

export const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUser: (state, actions: PayloadAction<User>) => {
			return { ...state, ...actions.payload };
		},
		setUser: (state, actions: PayloadAction<User>) => {
			return actions.payload;
		},
	},
});

export const { updateUser, setUser } = user.actions;

export default user.reducer;
