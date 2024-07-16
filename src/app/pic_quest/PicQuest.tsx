// import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { ChangeEvent, FormEvent, useState } from "react";
import { GiProcessor } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import { nanoid } from "@reduxjs/toolkit";
import { IoAddCircleSharp } from "react-icons/io5";
import { PicQuestModal } from "@/components/custom/modal/picQuestModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TbTools } from "react-icons/tb";
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

export const PicQuest = () => {
  const [open, setOpen] = useState(false);

  const [uploadControls, setUploadControls] = useState(false);

  const [query, setQuery] = useState<string>("");
  const customDispatch = useCustomDispatch();
  const dispatch = useDispatch();
  const bankGPTChatRes = useSelector(
    (state: RootState) => state.picQuest.bankGPTChat
  );
  const addQnsAnsRes = useSelector(
    (state: RootState) => state.picQuest.allQueries
  );

  const onSubmitChat = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    customDispatch(bankGPTChat(query))
      .unwrap()
      .then((res) => {
        // console.log(res?.response);
        const paylaod: allQueriesType = {
          ans: res?.data,
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

  // console.log(import.meta.env.VITE_PICQUEST);
  return (
    <div className="w-full h-full border-red-600 px-4 py-0 h-full overflow-hidden scroll-bar-medium-w scroll-bar-transparent  scroll-bar-thumb-rounded scroll-bar-thumb-grey">
      <div className="h-[3rem] w-full flex items-center justify-between container border-b">
        <HoverCard>
          <HoverCardTrigger asChild>
            <h1 className="text-base font-extrabold dark:text-white">
              CyberGPT
            </h1>
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
          <div className="hidden">
            <PicQuestModal open={open} setOpen={setOpen}>
              <Button onClick={onClickAddBtn}>
                <IoAddCircleSharp className="h-7 w-7 hover:scale-105 dark:text-[#fff] " />
              </Button>
            </PicQuestModal>
          </div>

          <Button>
            <UploadControlsModal
              open={uploadControls}
              setOpen={setUploadControls}
            >
              <Button onClick={onClickUploadContrDoc}>
                <IoAddCircleSharp className="text-xl" />
              </Button>
            </UploadControlsModal>
          </Button>
        </div>
      </div>
      <div className="pt-10  border-green-900 h-[calc(100vh-3.6rem-3rem-5rem)] overflow-x-hidden overflow-y-auto scroll-bar-medium-w scroll-bar-transparent   scroll-bar-thumb-rounded scroll-bar-thumb-grey bg-white dark:bg-[#000]">
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
              <ul className="list-disc ">
                {eachChat?.ans?.map((eachAns) => (
                  <li
                    className="break-words lg:max-w-[90%] dark:text-[#acaaaa] font-normal text-md mb-5 text-black dark:text-white"
                    key={nanoid()}
                  >
                    <span className="font-extrabold text-lg scale-110 mr-2">
                      {" "}
                      {eachAns?.split(":\n")[0]}:
                    </span>
                    {eachAns?.split(":\n")[1]}
                  </li>
                ))}
              </ul>
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
  );
};
