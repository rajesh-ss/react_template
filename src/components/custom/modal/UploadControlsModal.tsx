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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RootState, useCustomDispatch } from "@/store";
import {
  addQnsAns,
  allQueriesType,
  picQuestPostUploadImages,
} from "@/store/slices/PicQuestSlice";
import { nanoid } from "@reduxjs/toolkit";
import * as React from "react";
import { BsFillFileEarmarkCheckFill } from "react-icons/bs";
import { IoAddCircleSharp } from "react-icons/io5";
import { PiFileTextFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Ldr } from "../loaders/Ldr";

type UploadControlsModalPropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const UploadControlsModal: React.FC<UploadControlsModalPropsType> = (
  props
) => {
  const picQuestPostUploadImagesRes = useSelector(
    (state: RootState) => state.picQuest.picQuestPostUploadImages
  );

  React.useEffect(() => {
    if (picQuestPostUploadImagesRes?.data) {
      props?.setOpen(false);
    }
  }, [picQuestPostUploadImagesRes]);

  if (window.innerWidth > 768) {
    return (
      <Dialog open={props?.open} onOpenChange={props?.setOpen}>
        <DialogTrigger asChild>{props?.children}</DialogTrigger>
        <DialogContent className="sm:max-w-[750px] min-w-[60vw] bg-white dark:bg-black text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-center">Upload Documents</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <PicQuestUploadPic />
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
        <PicQuestUploadPic className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

function PicQuestUploadPic({ className }: React.ComponentProps<"div">) {
  const [filesUploaded, setFilesUploaded] = React.useState<File[]>([]);

  const [filesContr, setFilesContr] = React.useState<File[]>([]);

  const customDispatch = useCustomDispatch();
  const dispatch = useDispatch();
  const picQuestPostUploadImagesRes = useSelector(
    (state: RootState) => state.picQuest.picQuestPostUploadImages
  );

  const onDropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files && files.length > 0) {
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        setFilesUploaded((prev) => {
          return [...prev, files[fileIndex]];
        });
      }
    }
  };

  const onDropHandlerContr = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { files } = event.dataTransfer;
    if (files && files.length > 0) {
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        setFilesContr((prev) => {
          return [...prev, files[fileIndex]];
        });
      }
    }
  };

  const onDragOverHandlercontr = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log("Files dropped:", files);
  };

  const onDragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    console.log("Files dropped:", files);
  };

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allFiles: FileList | null = e.target.files;

    if (allFiles === null) {
      return;
    }

    if (allFiles && allFiles.length > 0) {
      for (let fileIndex = 0; fileIndex < allFiles.length; fileIndex++) {
        setFilesUploaded((prev) => {
          return [...prev, allFiles[fileIndex]];
        });
      }
    }
  };

  const onChangeFilesContr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const allFiles: FileList | null = e.target.files;

    if (allFiles === null) {
      return;
    }

    if (allFiles && allFiles.length > 0) {
      for (let fileIndex = 0; fileIndex < allFiles.length; fileIndex++) {
        setFilesContr((prev) => {
          return [...prev, allFiles[fileIndex]];
        });
      }
    }
  };

  const onsubmitUploadAllContr = () => {
    const formData = new FormData();

    filesUploaded?.forEach((eachFile) => {
      formData.append("files", eachFile);
    });

    // filesContr?.forEach((eachFile) => {
    //   formData.append("control_pdf", eachFile);
    // });

    customDispatch(picQuestPostUploadImages(formData))
      .unwrap()
      .then((res) => {
        // const body: allQueriesType = {
        //   ans: res?.data,
        //   qns: "",
        // };

        // dispatch(addQnsAns(body));
        toast(`${res?.message}`, {
          description: `${filesUploaded?.length} Files are uploaded`,
          icon: (
            <BsFillFileEarmarkCheckFill className="text-lg text-[#dbdb36]" />
          ),
        });
      })
      .catch((err) => {
        toast.error(`${err?.message}`, {});
      });
  };

  return (
    <div className=" overflow-y-auto">
      <div
        className={cn("grid items-start gap-4", className)}
        // onSubmit={onsubmitUploadAllPics}
      >
        {picQuestPostUploadImagesRes?.isLoading ? (
          <Ldr className="w-full" size={"sm"} />
        ) : (
          <></>
        )}
        {filesUploaded?.length > 0 ? (
          <div>
            <h4 className="text-sm extra-light-italics">Uploaded Documents</h4>
            {/* <p className="text-sm extra-light-italics">
              Note: Hover over to have a quick sneak peek of the image{" "}
            </p> */}

            <div className="flex justify-center items-center px-3 pt-5 gap-5 flex-wrap">
              {filesUploaded?.map((uploadedFiles) => (
                <div
                  key={nanoid()}
                  className="border-0 bg-[#eae8e8] p-2 rounded-xl"
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="flex justify-center items-center gap-2 cursor-pointer">
                        <PiFileTextFill className="text-[#e4c437] text-xl" />
                        <p className="text-xs extra-light-italics">
                          {uploadedFiles?.name?.length > 5
                            ? uploadedFiles?.name?.substring(-5) + "..."
                            : uploadedFiles?.name}
                        </p>
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent
                      className="w-80 bg-[#fff] dark:bg-[#000] dark:text-white"
                      asChild
                    >
                      <div className="flex justify-between space-x-4">
                        <span className="flex justify-center flex-col items-center gap-2 cursor-pointer">
                          <span className="w-full flex justify-center gap-3 p-3 border-b-2 bg-[#ffffff]">
                            <PiFileTextFill className="text-[#e4c437] text-xl" />
                            <p className="text-xs extra-light-italics">
                              {uploadedFiles?.name}
                            </p>
                          </span>

                          {/* <img
                            src={URL.createObjectURL(uploadedFiles)}
                            alt={`${uploadedFiles?.name?.substring(-5)}`}
                            className="w-full h-auto"
                          /> */}
                        </span>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="border-b-2 h-1  border-black flex-1"></div>
        <p className="text-xl">Upload Document</p>

        <div
          id="drop_zone"
          onDrop={onDropHandler}
          onDragOver={onDragOverHandler}
          className="border-2 border-dotted border-[#6a6969] flex justify-center items-center"
        >
          <p className="m-20">
            Drag one or more files to this <i>drop zone</i>.
          </p>
        </div>
        <div className="flex justify-center items-center py-1 px-0">
          <span className="border-b-2 h-1 border-dotted border-black flex-1"></span>
          <span className="mx-1">or</span>
          <span className="border-b-2 h-1 border-dotted border-black flex-1"></span>
        </div>
        <div className="border-0 flex justify-center pb-5">
          <Label
            htmlFor="picture"
            className="border-2 rounded-[.4rem] text-[#1d1c1c] px-5 py-2 hover:scale-105 cursor-pointer"
          >
            choose file
          </Label>
          <Input
            id="picture"
            type="file"
            // accept=".jpg, .png, .jpeg"
            multiple
            className="bg-[#dbd9d9] hidden"
            onChange={onChangeFiles}
          />
        </div>
      </div>

      {/* ------------------------------------ */}
      <div
        className={cn("grid items-start gap-4", className)}
        // onSubmit={onsubmitUploadAllContr}
      >
        {picQuestPostUploadImagesRes?.isLoading ? (
          <Ldr className="w-full" size={"sm"} />
        ) : (
          <></>
        )}
        {filesContr?.length > 0 ? (
          <div>
            <h4 className="text-sm extra-light-italics">Uploaded Documents</h4>
            {/* <p className="text-sm extra-light-italics">
              Note: Hover over to have a quick sneak peek of the image{" "}
            </p> */}

            <div className="flex justify-center items-center px-3 pt-5 gap-5 flex-wrap">
              {filesContr?.map((uploadedFiles) => (
                <div
                  key={nanoid()}
                  className="border-0 bg-[#eae8e8] p-2 rounded-xl"
                >
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <span className="flex justify-center items-center gap-2 cursor-pointer">
                        <PiFileTextFill className="text-[#e4c437] text-xl" />
                        <p className="text-xs extra-light-italics">
                          {uploadedFiles?.name?.length > 5
                            ? uploadedFiles?.name?.substring(-5) + "..."
                            : uploadedFiles?.name}
                        </p>
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent
                      className="w-80 bg-[#fff] dark:bg-[#000] dark:text-white"
                      asChild
                    >
                      <div className="flex justify-between space-x-4">
                        <span className="flex justify-center flex-col items-center gap-2 cursor-pointer">
                          <span className="w-full flex justify-center gap-3 p-3 border-b-2 bg-[#ffffff]">
                            <PiFileTextFill className="text-[#e4c437] text-xl" />
                            <p className="text-xs extra-light-italics">
                              {uploadedFiles?.name}
                            </p>
                          </span>

                          {/* <img
                            src={URL.createObjectURL(uploadedFiles)}
                            alt={`${uploadedFiles?.name?.substring(-5)}`}
                            className="w-full h-auto"
                          /> */}
                        </span>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* <div className="border-b-2 h-1  border-black flex-1"></div> */}
        {/* <p className="text-xl">Upload Controls Document</p>
        <div
          id="drop_zone"
          onDrop={onDropHandlerContr}
          onDragOver={onDragOverHandlercontr}
          className="border-2 border-dotted border-[#6a6969] flex justify-center items-center"
        >
          <p className="m-20">
            Drag one or more files to this <i>drop zone</i>.
          </p>
        </div>
        <div className="flex justify-center items-center py-1 px-0">
          <span className="border-b-2 h-1 border-dotted border-black flex-1"></span>
          <span className="mx-1">or</span>
          <span className="border-b-2 h-1 border-dotted border-black flex-1"></span>
        </div> */}
        {/* <div className="border-0 flex justify-center pb-5 ">
          <Label
            htmlFor="picture"
            className="border-2 rounded-[.4rem] text-[#1d1c1c] px-5 py-2 hover:scale-105 cursor-pointer"
          >
            choose file
          </Label>
          <Input
            id="picture"
            type="file"
            // accept=".jpg, .png, .jpeg"
            multiple
            className="bg-[#dbd9d9] hidden"
            onChange={onChangeFilesContr}
          />
        </div> */}
        <Button
          className="mb-5 hover:scale-x-105 border-2 w-[20rem] mx-auto  rounded-[.4rem] text-[#fff] font-bold hover:bg-green-500 bg-green-600"
          variant={"ghost"}
          type="button"
          onClick={onsubmitUploadAllContr}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
