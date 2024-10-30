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
import { resetContext } from "@/store/slices/PicQuestSlice";
import * as React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Ldr } from "../loaders/Ldr";

type ResetModalPropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const ResetModal: React.FC<ResetModalPropsType> = (props) => {
  const resetContextRes = useSelector(
    (state: RootState) => state.picQuest.resetContext
  );
  const customDispatch = useCustomDispatch();

  const onClickReset = () => {
    customDispatch(resetContext(null))
      .unwrap()
      .then((res) => {
        props.setOpen(false);
      })
      .catch((err) => {});
  };

  const onClickCancel = () => {
    props.setOpen(false);
  };

  React.useEffect(() => {
    if (resetContextRes?.data) {
      props?.setOpen(false);
    }
  }, [resetContextRes]);

  if (window.innerWidth > 768) {
    return (
      <Dialog open={props?.open} onOpenChange={props?.setOpen}>
        <DialogTrigger asChild>{props?.children}</DialogTrigger>
        <DialogContent className="sm:max-w-[750px] min-w-[60vw] bg-white dark:bg-black text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-extrabold">
              Reset Context
            </DialogTitle>
            {resetContextRes?.isLoading ? (
              <Ldr className="w-full" size={"sm"} />
            ) : (
              <></>
            )}
            <DialogDescription>
              Are you sure, you want clear the current context
            </DialogDescription>
          </DialogHeader>

          <div className=" overflow-y-auto">
            <div className="flex justify-end items-center p-5 gap-x-5">
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
                type="button"
                onClick={onClickReset}
              >
                Continue
              </Button>
            </div>
          </div>
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

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
