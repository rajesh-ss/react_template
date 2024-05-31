import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { nanoid } from "@reduxjs/toolkit";
import { FC, useState } from "react";
import { AiOutlineFilePdf } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { IoNavigateCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

type SideBarPropsType<T> = {
  files?: {
    imageFile: File | Array<T>;
    pdfFile: File | Array<T>;
  };
  qnsAns: {
    qns: string;
    ans: string;
    id: string;
  }[];
};

export const SideBar: FC<SideBarPropsType<FileList>> = (props) => {
  const [sidePanelViewMode, setSidePanelViewMode] = useState<string>("chat");

  const scrollToElementByClass = (className: string) => {
    const elements = document.getElementsByClassName(className);
    if (elements.length > 0) {
      elements[0].scrollIntoView({ behavior: "smooth" });
    }
  };
  const IsPicQuestSideBarOpenState = useSelector(
    (state: RootState) => state.handleSideBars.IsPicQuestSideBarOpen
  );
  const addQnsAnsRes = useSelector(
    (state: RootState) => state.picQuest.allQueries
  );

  const onValueChange = (value: string | null) => {
    if (value === null) {
      return;
    }
    setSidePanelViewMode(value);
  };

  return (
    <aside
      className={` h-[calc(100vh-3.6rem)] overflow-hidden pb-5 bg-gradient-to-tr from-stone-50 to-slate-50 dark:bg-gradient-to-tl dark:from-[#333] dark:to-[#000] dark:bg-[#000] ${
        IsPicQuestSideBarOpenState ? "w-[18vw]" : "w-[0rem]"
      }`}
    >
      <div className={`py-3 px-2 h-20 ${false ? "hidden" : ""}`}>
        <Select onValueChange={onValueChange}>
          <SelectTrigger
            className={`border-0 border-b-2 border-b-slate-200 dark:border-b-[#323232] dark:text-white `}
          >
            <SelectValue placeholder="Choose chat / files" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#212121] dark:border-0">
            <SelectGroup className="dark:text-white w-full">
              <SelectLabel className="dark:bg-[#232222] bg-[#c5c3c3]">
                Choose one
              </SelectLabel>
              <SelectItem
                value="chat"
                className="dark:hover:bg-slate-700 cursor-pointer "
              >
                <span className="flex items-center gap-2">
                  <BsChatLeftText
                    className={`w-4 h-4 hover:scale-105 cursor-pointer inline`}
                  />
                  <p className="inline text-sm">Chat</p>
                </span>
              </SelectItem>
              <SelectItem
                value="pdf"
                className="dark:hover:bg-slate-700 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <AiOutlineFilePdf
                    className={`w-4 h-4 hover:scale-105 cursor-pointer inline`}
                  />
                  <p className="inline text-sm">PDF</p>
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {sidePanelViewMode === "chat" ? (
        <ul
          className={`${
            props?.files === undefined
              ? "h-[calc(100vh-3.6rem)]"
              : "h-[calc(100vh-3.6rem-5rem)]"
          } overflow-y-auto w-full scroll-bar-small-w scroll-bar-transparent scroll-bar-thumb-rounded scroll-bar-thumb-grey`}
        >
          {addQnsAnsRes?.map((eachChat) => (
            <li
              className=" px-2 py-1 rounded-[0.3rem]  dark:text-white"
              key={nanoid()}
            >
              <Accordion
                type="single"
                collapsible
                className="w-full  break-all hover:bg-[#dddbdb] dark:hover:bg-[#282727] rounded-xl px-2 py-0"
              >
                <AccordionItem
                  value={eachChat?.ans}
                  className="border-0 w-full m-0"
                >
                  <AccordionTrigger className="hover:no-underline">
                    <span className="flex items-center gap-3 group">
                      <ChatBubbleIcon
                        className={`w-4 h-4 hover:scale-105 cursor-pointer group-hover:hidden`}
                      />
                      <IoNavigateCircleOutline className="dark:text-[#fff] text-[#000] text-2xl text-right hidden group-hover:block hover:scale-105" />
                      <p className="hover:no-underline">
                        {eachChat?.qns?.length > 15
                          ? eachChat?.qns?.substring(0, 15) + ".."
                          : eachChat?.qns}
                      </p>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="h-auto w-full">
                    <div className="flex justify-between items-center">
                      <p className=" h-auto mb-3">{eachChat?.qns}</p>

                      <button
                        className="cursor-pointer rounded-xl hover:bg-[#fff] dark:hover:bg-[#000] p-2"
                        onClick={() => scrollToElementByClass(eachChat?.ans)}
                      >
                        <IoNavigateCircleOutline className="dark:text-[#fff] text-[#000] text-2xl text-right" />
                      </button>
                    </div>

                    {/* <p className=" h-auto "> */}
                    {/* {eachChat?.ans} */}
                    <div
                      dangerouslySetInnerHTML={{ __html: eachChat?.ans }}
                      className=" h-auto "
                    />
                    {/* </p> */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
      {sidePanelViewMode === "pdf" ? <></> : <></>}
    </aside>
  );
};
