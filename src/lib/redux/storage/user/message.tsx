import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface Message {
	_id?: string;
	__v?: number;
	uid?: string;
	meta?: Record<string, any>;
	content?: string;
	server?: string;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: Message[] = [];

export const messages = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessage: (state, actions: PayloadAction<Message>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setMessages: (state, actions: PayloadAction<Message[]>) => {
			return actions.payload;
		},
	},
});

export const { setMessage, setMessages } = messages.actions;

export default messages.reducer;
