import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

interface Jackpot {
	_id?: string;
	__v?: string;
	server?: string;
	score?: number;
	updatedAt?: Date;
	createdAt?: Date;
}
// Define the initial state using that type
const initialState: Jackpot = {};

export const jackpot = createSlice({
	name: 'jackpot',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		updateJackpot: (state, actions: PayloadAction<Jackpot>) => {
			// Kiểm tra xem localStorage có khả dụng không
			return { ...state, ...actions.payload };
		},
	},
});

export const { updateJackpot } = jackpot.actions;

export default jackpot.reducer;
