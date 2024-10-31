import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface Bot {
	_id?: string;
	__v?: number;
	id?: string;
	uuid?: string;
	name?: string;
	map?: string;
	zone?: string;
	type_money?: '1' | '2';
	money?: number;
	server?: string;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: Bot[] = [];

export const Bots = createSlice({
	name: 'Bots',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setBot: (state, actions: PayloadAction<Bot>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setBots: (state, actions: PayloadAction<Bot[]>) => {
			return actions.payload;
		},
	},
});

export const { setBot, setBots } = Bots.actions;

export default Bots.reducer;
