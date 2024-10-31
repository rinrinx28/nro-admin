import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state

export interface EConfig {
	_id?: string;
	__v?: number;
	name?: string;
	description?: string;
	option?: Record<string, any>;
	isEnable?: boolean;
	updatedAt?: Date;
	createdAt?: Date;
}

// Define the initial state using that type
const initialState: EConfig[] = [];

export const eConfig = createSlice({
	name: 'EConfig',
	initialState,
	reducers: {
		setConfig: (state, actions: PayloadAction<EConfig>) => {
			return state
				.filter((b) => b._id !== actions.payload._id)
				.concat(actions.payload);
		},
		setConfigs: (state, actions: PayloadAction<EConfig[]>) => {
			return actions.payload;
		},
	},
});

export const { setConfig, setConfigs } = eConfig.actions;

export default eConfig.reducer;
