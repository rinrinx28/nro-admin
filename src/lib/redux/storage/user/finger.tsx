import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: string = '';

export const finger = createSlice({
	name: 'finger',
	initialState,
	reducers: {
		setFinger: (state, actions: PayloadAction<string>) => {
			return actions.payload;
		},
	},
});

export const { setFinger } = finger.actions;

export default finger.reducer;
