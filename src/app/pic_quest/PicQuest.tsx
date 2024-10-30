// import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { GiProcessor } from "react-icons/gi";
import { FaRegUser, FaSpider } from "react-icons/fa6";
import { nanoid } from "@reduxjs/toolkit";
import { IoAddCircleSharp } from "react-icons/io5";
import { PicQuestModal } from "@/components/custom/modal/picQuestModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TbTools } from "react-icons/tb";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MdOutlineResetTv } from "react-icons/md";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
// import { CalendarIcon } from '@radix-ui/react-icons';
import processingImage from "../../assets/processImage.png";
import { RootState, useCustomDispatch } from "@/store";
import {
  addQnsAns,
  allQueriesType,
  bankGPTChat,
} from "@/store/slices/PicQuestSlice";
import { useDispatch, useSelector } from "react-redux";
import { UploadControlsModal } from "@/components/custom/modal/UploadControlsModal";
import { ResetModal } from "@/components/custom/modal/ResetModal";
import { CrawlerAddUrlModal } from "@/components/custom/modal/Crawler";

export const PicQuest = () => {
  const [open, setOpen] = useState(false);

  const [uploadControls, setUploadControls] = useState(false);

  const [resetControls, setResetControls] = useState(false);

  const [crawlerControls, setCrawlerControls] = useState(false);

  const [query, setQuery] = useState<string>("");
  const customDispatch = useCustomDispatch();
  const dispatch = useDispatch();
  const bankGPTChatRes = useSelector(
    (state: RootState) => state.picQuest.bankGPTChat
  );
  const addQnsAnsRes = useSelector(
    (state: RootState) => state.picQuest.allQueries
  );
  const [statusIndex, setStatusIndex] = useState<number>(0);
  const statusMessages: string[] = [
    "Processing request...",
    "Loading your content...",
    "Hold on, we're working on it...",
    "Gathering information...",
    "Preparing your data...",
    "Just a moment, please...",
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  const onSubmitChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    customDispatch(bankGPTChat(query))
      .unwrap()
      .then((res) => {
        // console.log(res?.response);
        const paylaod: allQueriesType = {
          ans: res,
          qns: query,
        };
        dispatch(addQnsAns(paylaod));
      });
  };

  const onChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const onClickAddBtn = () => {
    setOpen(true);
  };

  const onClickUploadContrDoc = () => {
    setUploadControls(true);
  };

  const onClickResetContext = () => {
    setResetControls(true);
  };

  const onClickWebCrawler = () => {
    setCrawlerControls(true);
  };

  useEffect(() => {
    if (bankGPTChatRes?.isLoading) {
      const intervalId = setInterval(() => {
        setStatusIndex((prevIndex) => (prevIndex + 1) % statusMessages.length);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [bankGPTChatRes]);

  useEffect(() => {
    if (bankGPTChatRes?.data) {
      setQuery("");
      scrollToBottom();
    }
  }, [bankGPTChatRes]);

  // console.log(import.meta.env.VITE_PICQUEST);
  return (
    <>
      {bankGPTChatRes?.isLoading ? (
        <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center h-full w-full bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-8 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <h1 className="text-lg font-bold block mt-10">
            {statusMessages[statusIndex]}
          </h1>
        </div>
      ) : (
        <></>
      )}
      <div className="w-full h-full border-red-600 px-4 py-0 h-full overflow-hidden scroll-bar-medium-w scroll-bar-transparent  scroll-bar-thumb-rounded scroll-bar-thumb-grey">
        <div className="h-[3rem] w-full flex items-center justify-end container border-b-2 border-gray-300">
          <HoverCard>
            <HoverCardTrigger asChild>
              {/* <h1 className="text-base font-extrabold dark:text-white">
                CyberGPT
              </h1> */}
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-[#fff] dark:bg-[#000] dark:text-white">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src={processingImage} />
                  <AvatarFallback>CyberGPT</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">CyberGPT</h4>
                  <p className="text-sm">Upload bankGPT documents</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <div>
            {/* <div className="hidden">
              <PicQuestModal open={open} setOpen={setOpen}>
                <Button onClick={onClickAddBtn}>
                  <IoAddCircleSharp className="h-7 w-7 hover:scale-105 dark:text-[#fff] " />
                </Button>
              </PicQuestModal>
            </div> */}

            <Button>
              <UploadControlsModal
                open={uploadControls}
                setOpen={setUploadControls}
              >
                <Button onClick={onClickUploadContrDoc}>
                  <IoAddCircleSharp className="text-2xl" />
                </Button>
              </UploadControlsModal>
            </Button>

            {/* ResetModal */}
            <Button>
              <ResetModal open={resetControls} setOpen={setResetControls}>
                <Button onClick={onClickResetContext}>
                  <MdOutlineResetTv className="text-2xl" />
                </Button>
              </ResetModal>
            </Button>

            {/* <FaSpider /> */}

            <Button>
              <CrawlerAddUrlModal
                open={crawlerControls}
                setOpen={setCrawlerControls}
              >
                <Button onClick={onClickWebCrawler}>
                  <FaSpider className="text-2xl" />
                </Button>
              </CrawlerAddUrlModal>
            </Button>
          </div>
        </div>
        <div
          ref={containerRef}
          className="pt-10  border-green-900 h-[calc(100vh-3.6rem-3rem-5rem)] overflow-x-hidden overflow-y-auto scroll-bar-medium-w scroll-bar-transparent   scroll-bar-thumb-rounded scroll-bar-thumb-grey bg-white dark:bg-[#000]"
        >
          {addQnsAnsRes?.map((eachChat) => (
            <div
              className={` px-4 py-2 rounded-[0.3rem]  gap-3 dark:text-white break-words container`}
              key={nanoid()}
            >
              <div
                className={`p-2 my-3 flex gap-3 items-center ${
                  eachChat?.qns?.length > 0 ? "" : "hidden"
                }`}
              >
                <FaRegUser className="w-6 h-6 dark:text-[#cac8c8] " />
                <p className="break-words lg:max-w-[75%] dark:text-[#acaaaa] light text-sm">
                  {eachChat?.qns}
                </p>
              </div>
              <div className="p-2 my-3 flex  gap-10 justify-start items-start ">
                <div className="">
                  <GiProcessor className="w-6 h-6 dark:text-[#cac8c8] " />
                </div>
                <div>
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {eachChat?.ans}
                  </Markdown>
                </div>
              </div>
            </div>
          ))}
        </div>
        <section className=" h-[5rem] ">
          <form
            className="border-2 border-slate-300 container dark:border-[#2f2e2e] rounded-[0.5rem] flex w-full items-center justify-evenly bg-white dark:bg-[#000] px-1"
            onSubmit={onSubmitChat}
          >
            <input
              type="text"
              className="flex-1 dark:border-[#000] py-1 text-sm focus:border-0 min-h-[2.5rem] bg-white dark:bg-[#000] dark:text-white focus:outline-none"
              onChange={onChangeQuery}
              value={query}
              disabled={bankGPTChatRes?.isLoading}
            />
            <Button
              type="button"
              className="hover:scale-x-110 "
              disabled={bankGPTChatRes?.isLoading}
            >
              <PaperPlaneIcon className=" h-6 w-6 border-0 dark:text-white" />
            </Button>
          </form>
        </section>
      </div>
    </>
  );
};
