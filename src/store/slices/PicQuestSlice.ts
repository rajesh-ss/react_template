import { picQuestPostUploadImagesErrorType, picQuestPostUploadImagesSuccessType } from '@/types/picquestTypes';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { reduxStateTemplate } from '../../types/genericTypes';

const initialState = {
	picQuestPostUploadImages: reduxStateTemplate<picQuestPostUploadImagesSuccessType, picQuestPostUploadImagesErrorType>(),
};

export const picQuestPostUploadImages = createAsyncThunk<picQuestPostUploadImagesSuccessType, FormData, { rejectValue: picQuestPostUploadImagesErrorType }>(
	'picQuest/upload_images',
	async (formData, { rejectWithValue }) => {
		try {
			const { data } = await axios.post<picQuestPostUploadImagesSuccessType, AxiosResponse<picQuestPostUploadImagesSuccessType>, FormData>(
				`${import.meta.env.VITE_PICQUEST}/upload_images`,
				formData,
			);
			return data;
		} catch (err: unknown) {
			const error = err as AxiosError<picQuestPostUploadImagesErrorType>;
			if (!error.response) {
				throw err;
			}

			return rejectWithValue(error.response.data);
		}
	},
);

export const PicQuestSlice = createSlice({
	name: 'picQuest',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			// post
			.addCase(picQuestPostUploadImages.pending, (state) => {
				state.picQuestPostUploadImages.data = null;
				state.picQuestPostUploadImages.isLoading = true;
				state.picQuestPostUploadImages.error = null;
			})
			.addCase(picQuestPostUploadImages.fulfilled, (state, action) => {
				state.picQuestPostUploadImages.isLoading = false;
				state.picQuestPostUploadImages.error = null;
				state.picQuestPostUploadImages.data = action.payload;
			})
			.addCase(picQuestPostUploadImages.rejected, (state, action) => {
				state.picQuestPostUploadImages.isLoading = false;
				state.picQuestPostUploadImages.error = action.payload ?? {
					error: '',
				};
				state.picQuestPostUploadImages.data = null;
			});
	},
});
