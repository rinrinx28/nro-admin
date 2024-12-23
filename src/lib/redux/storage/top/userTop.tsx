import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../user/user';
// Define a type for the slice state

// Define the initial state using that type
const initialState: User[] = [];

export const userTop = createSlice({
	name: 'userTop',
	initialState,
	reducers: {
		setuserToptore: (state, actions: PayloadAction<User>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat([actions.payload]);
		},
		setuserToptores: (state, actions: PayloadAction<User[]>) => {
			return actions.payload;
		},
	},
});

export const { setuserToptore, setuserToptores } = userTop.actions;

export default userTop.reducer;
