import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import sideBarToggleSlice from './slices/sideBarToggleSlice';
import { PicQuestSlice } from './slices/PicQuestSlice';

export const store = configureStore({
	reducer: {
		handleSideBars: sideBarToggleSlice,
		picQuest: PicQuestSlice.reducer,
	},
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type CustomDispatch = typeof store.dispatch;
export const useCustomDispatch: () => CustomDispatch = useDispatch;

export const useCustomSelector = useSelector<RootState>;
