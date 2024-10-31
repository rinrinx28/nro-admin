import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state
export type typePlace =
	| 'C'
	| 'L'
	| 'T'
	| 'X'
	| 'CT'
	| 'CX'
	| 'LT'
	| 'LX'
	| string;

export type typeBet = 'cl' | 'g' | 'x';
export interface UserBet {
	_id?: string;
	__v?: number;
	meta?: Record<string, any>;
	betId?: string;
	uid?: string;
	amount?: number;
	revice?: number;
	place?: typePlace;
	typeBet?: typeBet;
	isEnd?: boolean;
	status?: number;
	result?: string;
	server?: string;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: UserBet[] = [];

export const userBets = createSlice({
	name: 'userBets',
	initialState,
	reducers: {
		setUserBet: (state, actions: PayloadAction<UserBet>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setUserBets: (state, actions: PayloadAction<UserBet[]>) => {
			return actions.payload;
		},
	},
});

export const { setUserBet, setUserBets } = userBets.actions;

export default userBets.reducer;
