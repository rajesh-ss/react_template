import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  webCrawlerAddContext,
  webCrawlerAddrUrl,
} from "@/store/slices/PicQuestSlice";
import * as React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Ldr } from "../loaders/Ldr";
import { toast } from "sonner";
// import { webCrawlerAddrUrlPayloadType } from "@/types/picquestTypes";

type CrawlerPRopsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const CrawlerAddUrlModal: React.FC<CrawlerPRopsType> = (props) => {
  const customDispatch = useCustomDispatch();

  const [url, setUrl] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");
  const [domain, setDomain] = React.useState<string>("");
  const [regulatoryName, setRegulatoryName] = React.useState<string>("");
  const [docType, setDocType] = React.useState<string>("");
  const [year, setYear] = React.useState<string>("");

  const webCrawlerAddrUrlRes = useSelector(
    (state: RootState) => state.picQuest.webCrawlerAddrUrl
  );

  const webCrawlerAddContextRes = useSelector(
    (state: RootState) => state.picQuest.webCrawlerAddContext
  );

  const onChangeCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const onChangeDomain = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(event.target.value);
  };

  const onChangeRegulatoryName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRegulatoryName(event.target.value);
  };

  const onChangeDocType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocType(event.target.value);
  };

  const onChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  const onChangeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const onClickCancel = () => {
    props.setOpen(false);
    setCountry("");
    setDomain("");
    setRegulatoryName("");
    setDocType("");
    setYear("");
    setUrl("");
  };

  const onSubmitURLCrawler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const payload: webCrawlerAddrUrlPayloadType = {
    //   selected_url: url,
    // };

    const formData = new FormData();
    formData.append("selected_url", url);

    customDispatch(webCrawlerAddrUrl(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        props.setOpen(false);
        setUrl("");
      })
      .catch((err) => {
        setUrl("");
      });
  };

  const onSubmitAddContext = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("country", country);
    formData.append("domain", domain);
    formData.append("regulatory_name", regulatoryName);
    formData.append("doc_type", docType);
    formData.append("year", year);

    customDispatch(webCrawlerAddContext(formData))
      .unwrap()
      .then((res) => {
        toast.success(`Successfully added ${res.available_links.join(",\n")}`);

        setCountry("");
        setDomain("");
        setRegulatoryName("");
        setDocType("");
        setYear("");

        props.setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    if (webCrawlerAddrUrlRes?.data || webCrawlerAddContextRes?.data) {
      props?.setOpen(false);
    }
  }, [webCrawlerAddrUrlRes, webCrawlerAddContextRes]);

  // For big screen

  if (window.innerWidth > 768) {
    return (
      <Dialog open={props?.open} onOpenChange={props?.setOpen}>
        <DialogTrigger asChild>{props?.children}</DialogTrigger>
        <DialogContent className="sm:max-w-[750px] min-w-[60vw] max-h-[90vh] overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-extrabold">
              Add website URL or provide additional Context to our CyberGPT
            </DialogTitle>
            {webCrawlerAddrUrlRes?.isLoading ||
            webCrawlerAddContextRes?.isLoading ? (
              <Ldr className="w-full" size={"sm"} />
            ) : (
              <></>
            )}
          </DialogHeader>

          <h2 className="mt-16 text-center text-xl font-extrabold">
            Add the website URL to provide more context and additional
            information for our CyberGPT.
          </h2>

          <form className="" onSubmit={onSubmitURLCrawler}>
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

          <div className="flex justify-center items-center py-1 px-0">
            <span className="border-b-2 h-1 border-dotted border-black flex-1"></span>
            <span className="mx-1">or</span>
            <span className="border-b-2 h-1 border-dotted border-black flex-1"></span>
          </div>

          <h2 className="text-center text-xl font-extrabold">
            Enter Keywords to provide more context and additional information
            for our cybergpt
          </h2>

          <form className="" onSubmit={onSubmitAddContext}>
            <div className="flex items-center my-5">
              <label htmlFor="IDCountry" className="text-md font-bolx mx-5">
                Enter Country
              </label>
              <input
                type="text"
                placeholder="Enter the Country here"
                id="IDCountry"
                className="text-md font-semibold border-2 w-auto p-2 flex-1"
                onChange={onChangeCountry}
                value={country}
              />
            </div>

            <div className="flex items-center my-5">
              <label htmlFor="IDDomain" className="text-md font-bolx mx-5">
                Enter Domain/Sector
              </label>
              <input
                type="text"
                placeholder="Enter the Domain/Sector here"
                id="IDDomain"
                className="text-md font-semibold border-2 w-auto p-2 flex-1"
                onChange={onChangeDomain}
                value={domain}
              />
            </div>

            <div className="flex items-center my-5">
              <label htmlFor="IDRegulatory" className="text-md font-bolx mx-5">
                Enter Regulatory/Authority name
              </label>
              <input
                type="text"
                placeholder="Enter the Regulatory/Authority name here"
                id="IDRegulatory"
                className="text-md font-semibold border-2 w-auto p-2 flex-1"
                onChange={onChangeRegulatoryName}
                value={regulatoryName}
              />
            </div>

            <div className="flex items-center my-5">
              <label htmlFor="IDDocType" className="text-md font-bolx mx-5">
                Enter Document type
              </label>
              <input
                type="text"
                placeholder="Enter the Country here"
                id="IDDocType"
                className="text-md font-semibold border-2 w-auto p-2 flex-1"
                onChange={onChangeDocType}
                value={docType}
              />
            </div>

            <div className="flex items-center my-5">
              <label htmlFor="IDYear" className="text-md font-bolx mx-5">
                Select Year
              </label>
              <input
                type="year"
                placeholder="Enter the Year"
                id="IDYear"
                className="text-md font-semibold border-2 w-auto p-2 flex-1"
                onChange={onChangeYear}
                value={year}
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
        <form className="" onSubmit={onSubmitURLCrawler}>
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
