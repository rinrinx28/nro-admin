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

export const clanTop = createSlice({
	name: 'clanTop',
	initialState,
	reducers: {
		setClanTop: (state, actions: PayloadAction<Clan>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat([actions.payload]);
		},
		setclanTops: (state, actions: PayloadAction<Clan[]>) => {
			return actions.payload;
		},
	},
});

export const { setClanTop, setclanTops } = clanTop.actions;

export default clanTop.reducer;
