import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface MsgClan {
	_id?: string;
	__v?: number;
	uid?: string;
	meta?: Record<string, any>;
	content?: string;
	clanId?: string;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: MsgClan[] = [];

export const msgClan = createSlice({
	name: 'msgClan',
	initialState,
	reducers: {
		setMsgClan: (state, actions: PayloadAction<MsgClan>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setMsgClans: (state, actions: PayloadAction<MsgClan[]>) => {
			return actions.payload;
		},
	},
});

export const { setMsgClan, setMsgClans } = msgClan.actions;

export default msgClan.reducer;
