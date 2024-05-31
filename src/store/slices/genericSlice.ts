import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

export type BspQuantUnitType = {
	status: string;
};

const initialState = {};

export const genericSlice = createSlice({
	name: 'generic',
	initialState,
	reducers: {
		onChangeBSPUnit: (state, action: PayloadAction<BspQuantUnitType>): void => {
			// state.bspQuantUnits.status = action.payload.status;
		},
	},
	extraReducers(builder) {
		builder;
		// GET DOC BY NAME
		// .addCase(getDocByNameData.pending, (state) => {
		// 	state.getDocByNameData.data = null;
		// 	state.getDocByNameData.isLoading = true;
		// 	state.getDocByNameData.error = null;
		// })
		// .addCase(getDocByNameData.fulfilled, (state, action) => {
		// 	state.getDocByNameData.isLoading = false;
		// 	state.getDocByNameData.error = null;
		// 	state.getDocByNameData.data = action.payload;
		// })
		// .addCase(getDocByNameData.rejected, (state, action) => {
		// 	state.getDocByNameData.isLoading = false;
		// 	state.getDocByNameData.error = action.payload ?? { status: false, message: '' };
		// 	state.getDocByNameData.data = null;
		// })
	},
});

// Action creators are generated for each case reducer function
export const { onChangeBSPUnit } = genericSlice.actions;
