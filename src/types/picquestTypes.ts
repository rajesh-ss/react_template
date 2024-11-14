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

// export type webCrawlerAddrUrlPayloadType = {
//   selected_url: string;
// };

export type webCrawlerAddrUrlErrorType = {
  status: false;
  message: string;
};

export type webCrawlerAddContextSuccessType = {
  status: true;
  message: string;
  available_links: string[];
};

export type webCrawlerAddContextErrorType = {
  status: false;
  message: string;
};
