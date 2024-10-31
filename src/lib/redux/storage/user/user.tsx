import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface User {
	_id?: string;
	__v?: number;
	isLogin: boolean;
	token?: string;
	username?: string;
	name?: string;
	money?: number;
	email?: string;
	role?: string;
	meta?: Record<string, any>;
	isBaned?: boolean;
	server?: string;
	diamon?: number;
	updatedAt?: Date;
	createdAt?: Date;
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
