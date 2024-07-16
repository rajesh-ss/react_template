import {
  bankGPTChatErrorType,
  bankGPTChatSuccessType,
  picQuestPostUploadImagesErrorType,
  picQuestPostUploadImagesSuccessType,
} from "@/types/picquestTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { reduxStateTemplate } from "../../types/genericTypes";
import { stat } from "fs";

export type allQueriesType = {
  qns: string;
  ans: string[];
};

const initialState = {
  picQuestPostUploadImages: reduxStateTemplate<
    picQuestPostUploadImagesSuccessType,
    picQuestPostUploadImagesErrorType
  >(),
  bankGPTChat: reduxStateTemplate<
    bankGPTChatSuccessType,
    bankGPTChatErrorType
  >(),
  allQueries: [] as allQueriesType[],
};

export const picQuestPostUploadImages = createAsyncThunk<
  picQuestPostUploadImagesSuccessType,
  FormData,
  { rejectValue: picQuestPostUploadImagesErrorType }
>(
  "http://10.10.10.71:5000/check-guidelines",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<
        picQuestPostUploadImagesSuccessType,
        AxiosResponse<picQuestPostUploadImagesSuccessType>,
        FormData
      >(`http://10.10.10.71:5000/check-guidelines`, formData);
      return data;
    } catch (err: unknown) {
      const error = err as AxiosError<picQuestPostUploadImagesErrorType>;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const bankGPTChat = createAsyncThunk<
  bankGPTChatSuccessType,
  string,
  { rejectValue: bankGPTChatErrorType }
>("10.10.10.175:6001/chat?text=", async (qns, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("message", qns);

    const { data } = await axios.post<
      bankGPTChatSuccessType,
      AxiosResponse<bankGPTChatSuccessType>,
      FormData
    >(`http://10.10.10.71:5000/chat`, formData);
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError<bankGPTChatErrorType>;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

// allQueriesType

export const PicQuestSlice = createSlice({
  name: "picQuest",
  initialState,
  reducers: {
    addQnsAns: (state, action: PayloadAction<allQueriesType>): void => {
      state.allQueries.push(action.payload);
    },
  },
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
          error: "",
        };
        state.picQuestPostUploadImages.data = null;
      })

      //   BankGPT
      .addCase(bankGPTChat.pending, (state) => {
        state.bankGPTChat.data = null;
        state.bankGPTChat.isLoading = true;
        state.bankGPTChat.error = null;
      })
      .addCase(bankGPTChat.fulfilled, (state, action) => {
        state.bankGPTChat.isLoading = false;
        state.bankGPTChat.error = null;
        state.bankGPTChat.data = action.payload;
      })
      .addCase(bankGPTChat.rejected, (state, action) => {
        state.bankGPTChat.isLoading = false;
        state.bankGPTChat.error = action.payload ?? {
          response: "",
        };
        state.bankGPTChat.data = null;
      });
  },
});

export const { addQnsAns } = PicQuestSlice.actions;
