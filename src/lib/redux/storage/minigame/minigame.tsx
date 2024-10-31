import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface MiniGame {
	_id?: string;
	__v?: number;
	uuid?: string;
	isEnd?: boolean;
	result?: string;
	lastResult?: string;
	server?: string;
	timeEnd?: Date;
	resultUser?: Record<string, any>;
	updatedAt?: Date;
	createdAt?: Date;
}
// Define the initial state using that type
const initialState: MiniGame[] = [];

export const Minigame = createSlice({
	name: 'minigame',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setMinigame: (state, actions: PayloadAction<MiniGame>) => {
			return state
				.filter((b) => b.server !== actions.payload.server)
				.concat(actions.payload);
		},
		setMinigames: (state, actions: PayloadAction<MiniGame[]>) => {
			return actions.payload;
		},
	},
});

export const { setMinigame, setMinigames } = Minigame.actions;

export default Minigame.reducer;
