import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
	IsPicQuestSideBarOpen: false,
};

export const sideBarToggleSlice = createSlice({
	name: 'sideBarToggleSlice',
	initialState,
	reducers: {
		togglePicQuest: (state): void => {
			state.IsPicQuestSideBarOpen = !state.IsPicQuestSideBarOpen;
		},
	},
});

// Action creators are generated for each case reducer function
export const { togglePicQuest } = sideBarToggleSlice.actions;

export default sideBarToggleSlice.reducer;
