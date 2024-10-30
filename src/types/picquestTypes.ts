export type picQuestPostUploadImagesSuccessType = {
  // data: string;
  status: true;
  message: string;
};
export type picQuestPostUploadImagesErrorType = { error: string };

export type bankGPTChatSuccessType = {};
export type bankGPTChatErrorType = { response: string };

//resetContext
export type resetContextSuccessType = {
  status: true;
  message: string;
};

export type resetContextErrorType = {
  status: false;
  message: string;
};

// webCrawlerAddrUrl
export type webCrawlerAddrUrlSuccessType = {
  status: true;
  message: string;
};

export type webCrawlerAddrUrlPayloadType = {
  url: string;
};

export type webCrawlerAddrUrlErrorType = {
  status: false;
  message: string;
};
