import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface UserActive {
	_id?: string;
	__v?: number;
	uid?: string;
	active?: Record<string, any>;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: UserActive[] = [];

export const userActives = createSlice({
	name: 'userActives',
	initialState,
	reducers: {
		setUserActive: (state, actions: PayloadAction<UserActive>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setUserActives: (state, actions: PayloadAction<UserActive[]>) => {
			return actions.payload;
		},
	},
});

export const { setUserActive, setUserActives } = userActives.actions;

export default userActives.reducer;
