import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface Clan {
	_id?: string;
	__v?: number;
	ownerId?: string;
	meta?: Record<string, any>;
	member?: number;
	score?: number;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: Clan[] = [];

export const Clans = createSlice({
	name: 'Clans',
	initialState,
	reducers: {
		setClan: (state, actions: PayloadAction<Clan>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setClans: (state, actions: PayloadAction<Clan[]>) => {
			return actions.payload;
		},
		removeClan: (state, actions: PayloadAction<string>) => {
			return state.filter((b) => b._id !== actions.payload);
		},
	},
});

export const { setClan, setClans, removeClan } = Clans.actions;

export default Clans.reducer;
