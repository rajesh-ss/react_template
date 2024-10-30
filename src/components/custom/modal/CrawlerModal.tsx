import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RootState, useCustomDispatch } from "@/store";
import { resetContext, webCrawlerAddrUrl } from "@/store/slices/PicQuestSlice";
import * as React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Ldr } from "../loaders/Ldr";
import { webCrawlerAddrUrlPayloadType } from "@/types/picquestTypes";

type CrawlerPRopsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const CrawlerAddUrlModal: React.FC<CrawlerPRopsType> = (props) => {
  const webCrawlerAddrUrlRes = useSelector(
    (state: RootState) => state.picQuest.webCrawlerAddrUrl
  );
  const customDispatch = useCustomDispatch();

  const [url, setUrl] = React.useState<string>("");

  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const onClickCancel = () => {
    props.setOpen(false);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: webCrawlerAddrUrlPayloadType = {
      url: url,
    };
    customDispatch(webCrawlerAddrUrl(payload))
      .unwrap()
      .then((res) => {
        props.setOpen(false);
        setUrl("");
      })
      .catch((err) => {
        setUrl("");
      });
  };

  React.useEffect(() => {
    if (webCrawlerAddrUrlRes?.data) {
      props?.setOpen(false);
    }
  }, [webCrawlerAddrUrlRes]);

  if (window.innerWidth > 768) {
    return (
      <Dialog open={props?.open} onOpenChange={props?.setOpen}>
        <DialogTrigger asChild>{props?.children}</DialogTrigger>
        <DialogContent className="sm:max-w-[750px] min-w-[60vw] bg-white dark:bg-black text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-extrabold">
            Add the website URL to provide more context and additional information for our CyberGPT.
            </DialogTitle>
            {webCrawlerAddrUrlRes?.isLoading ? (
              <Ldr className="w-full" size={"sm"} />
            ) : (
              <></>
            )}
          </DialogHeader>

          <form className="" onSubmit={onSubmit}>
            <div className="flex items-center">
              <label htmlFor="IDUrl" className="text-md font-bolx mx-5">
                Enter the URL here:
              </label>
              <input
                type="text"
                placeholder="Enter the URL here"
                id="IDUrl"
                className="text-md font-semibold border-2 w-auto p-2 flex-1"
                onChange={onChangeUrl}
                value={url}
              />
            </div>
            <div className="flex justify-end items-center p-5 gap-x-5 ">
              <Button
                variant={"default"}
                className="bg-red-600 text-white rounded-[.450rem] hover:bg-red-800"
                onClick={onClickCancel}
              >
                Cancel
              </Button>
              <Button
                variant={"default"}
                className="bg-green-600 text-white rounded-[.450rem] hover:bg-green-800"
                type="submit"
                // onClick={onClickContinue}
              >
                Continue
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={props?.open} onOpenChange={props?.setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <IoAddCircleSharp className="h-7 w-7 hover:scale-105 dark:text-[#fff]" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="sm:max-w-[750px]  bg-white dark:bg-black text-black dark:text-white">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <form className="" onSubmit={onSubmit}>
          <label htmlFor="IDUrl" className="text-md font-bolx mx-5">
            Enter the URL here:
          </label>
          <input
            type="text"
            placeholder="Enter the URL here"
            id="IDUrl"
            className="text-md font-semibold border-2"
            onChange={onChangeUrl}
            value={url}
          />
          <div className="flex justify-end items-center p-5 gap-x-5 ">
            <Button
              variant={"default"}
              className="bg-red-600 text-white rounded-[.450rem] hover:bg-red-800"
              onClick={onClickCancel}
            >
              Cancel
            </Button>
            <Button
              variant={"default"}
              className="bg-green-600 text-white rounded-[.450rem] hover:bg-green-800"
              type="submit"
              // onClick={onClickContinue}
            >
              Continue
            </Button>
          </div>
        </form>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
