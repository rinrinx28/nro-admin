import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './user';
// Define a type for the slice state

// Define the initial state using that type
const initialState: User[] = [];

export const users = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUserStore: (state, actions: PayloadAction<User>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setUserStores: (state, actions: PayloadAction<User[]>) => {
			return actions.payload;
		},
	},
});

export const { setUserStore, setUserStores } = users.actions;

export default users.reducer;
