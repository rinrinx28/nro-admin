import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface InviteClan {
	_id?: string;
	__v?: number;
	uid?: string;
	clanId?: string;
	meta?: Record<string, any>;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: InviteClan[] = [];

export const inviteClans = createSlice({
	name: 'inviteClans',
	initialState,
	reducers: {
		setInviteClan: (state, actions: PayloadAction<InviteClan>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setInviteClans: (state, actions: PayloadAction<InviteClan[]>) => {
			return actions.payload;
		},
		removeInviteClan: (state, actions: PayloadAction<string>) => {
			return state.filter((b) => b._id !== actions.payload);
		},
	},
});

export const { setInviteClan, setInviteClans, removeInviteClan } =
	inviteClans.actions;

export default inviteClans.reducer;
