import {
  bankGPTChatErrorType,
  bankGPTChatSuccessType,
  picQuestPostUploadImagesErrorType,
  picQuestPostUploadImagesSuccessType,
  resetContextErrorType,
  resetContextSuccessType,
  webCrawlerAddrUrlErrorType,
  webCrawlerAddrUrlPayloadType,
  webCrawlerAddrUrlSuccessType,
} from "@/types/picquestTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError, AxiosResponse } from "axios";
import { reduxStateTemplate } from "../../types/genericTypes";
import { stat } from "fs";

export type allQueriesType = {
  qns: string;
  ans: string;
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
  resetContext: reduxStateTemplate<
    resetContextSuccessType,
    resetContextErrorType
  >(),
  webCrawlerAddrUrl: reduxStateTemplate<
    webCrawlerAddrUrlSuccessType,
    webCrawlerAddrUrlErrorType
  >(),
};

export const picQuestPostUploadImages = createAsyncThunk<
  picQuestPostUploadImagesSuccessType,
  FormData,
  { rejectValue: picQuestPostUploadImagesErrorType }
>("http://10.10.10.71:5000/set-docs", async (formData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<
      picQuestPostUploadImagesSuccessType,
      AxiosResponse<picQuestPostUploadImagesSuccessType>,
      FormData
    >(`http://10.10.10.71:5000/set-docs`, formData);
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError<picQuestPostUploadImagesErrorType>;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

export const bankGPTChat = createAsyncThunk<
  string,
  string,
  { rejectValue: bankGPTChatErrorType }
>("10.10.10.175:6001/chat?text=", async (qns, { rejectWithValue }) => {
  try {
    // const formData = new FormData();
    // formData.append("message", qns);

    const { data } = await axios.get<string, AxiosResponse<string>, FormData>(
      `http://10.10.10.71:5000/chat?text=${qns}`
    );
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError<bankGPTChatErrorType>;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

//resetContext
export const resetContext = createAsyncThunk<
  resetContextSuccessType,
  null,
  { rejectValue: resetContextErrorType }
>("10.10.10.71:5000/reset", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<
      resetContextSuccessType,
      AxiosResponse<resetContextSuccessType>,
      FormData
    >(`http://10.10.10.71:5000/reset`);
    return data;
  } catch (err: unknown) {
    const error = err as AxiosError<resetContextErrorType>;
    if (!error.response) {
      throw err;
    }

    return rejectWithValue(error.response.data);
  }
});

// webCrawlerAddrUrl
export const webCrawlerAddrUrl = createAsyncThunk<
  webCrawlerAddrUrlSuccessType,
  webCrawlerAddrUrlPayloadType,
  { rejectValue: webCrawlerAddrUrlErrorType }
>(
  "10.10.10.71:5000/add_url_webcrawler",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<
        webCrawlerAddrUrlSuccessType,
        AxiosResponse<webCrawlerAddrUrlSuccessType>,
        webCrawlerAddrUrlPayloadType
      >(`http://10.10.10.71:5000/add_url_webcrawler`, payload);
      return data;
    } catch (err: unknown) {
      const error = err as AxiosError<webCrawlerAddrUrlErrorType>;
      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

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
      })

      // resetContext
      .addCase(resetContext.pending, (state) => {
        state.resetContext.data = null;
        state.resetContext.isLoading = true;
        state.resetContext.error = null;
      })
      .addCase(resetContext.fulfilled, (state, action) => {
        state.resetContext.isLoading = false;
        state.resetContext.error = null;
        state.resetContext.data = action.payload;
      })
      .addCase(resetContext.rejected, (state, action) => {
        state.resetContext.isLoading = false;
        state.resetContext.error = action.payload ?? {
          message: "",
          status: false,
        };
        state.resetContext.data = null;
      })

      // webCrawlerAddrUrl
      .addCase(webCrawlerAddrUrl.pending, (state) => {
        state.webCrawlerAddrUrl.data = null;
        state.webCrawlerAddrUrl.isLoading = true;
        state.webCrawlerAddrUrl.error = null;
      })
      .addCase(webCrawlerAddrUrl.fulfilled, (state, action) => {
        state.webCrawlerAddrUrl.isLoading = false;
        state.webCrawlerAddrUrl.error = null;
        state.webCrawlerAddrUrl.data = action.payload;
      })
      .addCase(webCrawlerAddrUrl.rejected, (state, action) => {
        state.webCrawlerAddrUrl.isLoading = false;
        state.webCrawlerAddrUrl.error = action.payload ?? {
          message: "",
          status: false,
        };
        state.webCrawlerAddrUrl.data = null;
      });
  },
});

export const { addQnsAns } = PicQuestSlice.actions;
