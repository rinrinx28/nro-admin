import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

type TypeService = '0' | '1' | '2' | '3';
export interface Service {
	_id?: string;
	__v?: number;
	uid?: string;
	playerName?: string;
	playerId?: string;
	amount?: number;
	revice?: number;
	type?: TypeService;
	status?: string;
	isEnd?: boolean;
	bot_id?: string;
	server?: string;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: Service[] = [];

export const services = createSlice({
	name: 'services',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setService: (state, actions: PayloadAction<Service>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setServices: (state, actions: PayloadAction<Service[]>) => {
			return actions.payload;
		},
	},
});

export const { setService, setServices } = services.actions;

export default services.reducer;
