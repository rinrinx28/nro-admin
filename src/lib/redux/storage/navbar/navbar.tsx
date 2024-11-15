import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: boolean = false;

export const ShowNavFull = createSlice({
	name: 'isShowNavFull',
	initialState,
	reducers: {
		setIsShowNavFull: (state, actions: PayloadAction<boolean>) => {
			localStorage.setItem('isShowNav', `${actions.payload}`);
			return actions.payload;
		},
	},
});

export const { setIsShowNavFull } = ShowNavFull.actions;

export default ShowNavFull.reducer;
