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
import { nanoid } from "@reduxjs/toolkit";
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

  const onChangeCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(event.target.value);
  };

  const onChangeDomain = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDomain(event.target.value);
  };

  const onChangeRegulatoryName = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRegulatoryName(event.target.value);
  };

  const onChangeDocType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDocType(event.target.value);
  };

  const onChangeYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  const onClickURLByRes = (url: string) => {
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

  const onSubmitURLCrawler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("selected_url", url);

    customDispatch(webCrawlerAddrUrl(formData))
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        // props.setOpen(false);
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
        toast.success(`Successfully added`);

        setCountry("");
        setDomain("");
        setRegulatoryName("");
        setDocType("");
        setYear("");

        // props.setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // React.useEffect(() => {
  //   if (webCrawlerAddrUrlRes?.data || webCrawlerAddContextRes?.data) {
  //     props?.setOpen(false);
  //   }
  // }, [webCrawlerAddrUrlRes, webCrawlerAddContextRes]);

  // For big screen

  if (window.innerWidth > 768) {
    return (
      <Dialog open={props?.open} onOpenChange={props?.setOpen}>
        <DialogTrigger asChild>{props?.children}</DialogTrigger>
        <DialogContent className="sm:max-w-[750px] min-w-[60vw] max-h-[90vh] overflow-y-auto bg-white dark:bg-black text-black dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-extrabold">
              Add website URL or provide additional Context to our CyberGPT
            </DialogTitle>
            {webCrawlerAddrUrlRes?.isLoading ||
            webCrawlerAddContextRes?.isLoading ? (
              <Ldr className="w-full" size={"sm"} />
            ) : (
              <></>
            )}
          </DialogHeader>

          <h2 className="mt-16 text-center text-lg font-extrabold">
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

          <h2 className="text-center text-lg font-extrabold">
            Enter Keywords to provide more context and additional information
            for our cybergpt
          </h2>

          <form className="" onSubmit={onSubmitAddContext}>
            <div className="grid grid-cols-12 my-8">
              <label
                htmlFor="IDCountry"
                className="text-md font-bold mx-5 col-span-3 flex justify-start items-center"
              >
                Enter Country
              </label>
              <select
                id="IDCountry"
                className="text-md font-semibold w-auto p-2  col-span-9"
                onChange={onChangeCountry}
                value={country}
              >
                <option value="" defaultChecked disabled>
                  Select country
                </option>
                {/* India, Pakistan, Australia, Malaysia, Srilanka, Afganistan, Egypt, Oman, Poland, Turkey, USA, UK, Singapore, Hongkong, Bangladesh */}

                <option value={"india"}>{"India"}</option>
                <option value={"pakistan"}>{"Pakistan"}</option>
                <option value={"australia"}>{"Australia"}</option>
                <option value={"malaysia"}>{"Malaysia"}</option>
                <option value={"srilanka"}>{"Srilanka"}</option>
                <option value={"afganistan"}>{"Afganistan"}</option>
                <option value={"egypt"}>{"Egypt"}</option>
                <option value={"oman"}>{"Oman"}</option>
                <option value={"poland"}>{"Poland"}</option>
                <option value={"turkey"}>{"Turkey"}</option>
                <option value={"usa"}>{"USA"}</option>
                <option value={"uk"}>{"UK"}</option>
                <option value={"singapore"}>{"Singapore"}</option>
                <option value={"hongkong"}>{"Hongkong"}</option>
                <option value={"bangladesh"}>{"Bangladesh"}</option>
              </select>
            </div>

            <div className="grid grid-cols-12 my-8">
              <label
                htmlFor="IDDomain"
                className="text-md font-bold mx-5 col-span-3 flex justify-start items-center"
              >
                Enter Domain/Sector
              </label>
              <select
                id="IDDomain"
                className="text-md font-semibold border-2 w-auto p-2 flex-1 col-span-9"
                onChange={onChangeDomain}
                value={domain}
              >
                <option value="" defaultChecked disabled>
                  Select Domain/Sector
                </option>
                {/* Finance, Banking, Telecom, Cyber Security, Process compliance */}
                <option value={"finance"}>{"Finance"}</option>
                <option value={"banking"}>{"Banking"}</option>
                <option value={"telecom"}>{"Telecom"}</option>
                <option value={"cyber-security"}>{"Cyber Security"}</option>
                <option value={"process-compliance"}>
                  {"Process compliance"}
                </option>
              </select>
            </div>

            <div className="grid grid-cols-12 my-8">
              <label
                htmlFor="IDRegulatory"
                className="text-md font-bold mx-5 col-span-3 flex justify-start items-center"
              >
                Enter Regulatory/Authority name
              </label>
              <select
                id="IDRegulatory"
                className="text-md font-semibold border-2 w-auto p-2 col-span-9"
                onChange={onChangeRegulatoryName}
                value={regulatoryName}
              >
                <option value="" defaultChecked disabled>
                  Select Regulatory/Authority name
                </option>

                {/* RBI, SEBI, NIST-CSF, HKMA, APRA, ISO 27001, FFIEC */}

                <option value="RBI">RBI</option>
                <option value="SEBI">SEBI</option>
                <option value="NIST-CSF">NIST-CSF</option>
                <option value="HKMA">HKMA</option>
                <option value="APRA">APRA</option>
                <option value="ISO 27001">ISO 27001</option>
                <option value="FFIEC">FFIEC</option>
              </select>
            </div>

            <div className="grid grid-cols-12 my-8">
              <label
                htmlFor="IDDocType"
                className="text-md font-bold mx-5 col-span-3 flex justify-start items-center"
              >
                Enter Document type
              </label>
              <select
                id="IDDocType"
                className="text-md font-semibold border-2 w-auto p-2 col-span-9"
                onChange={onChangeDocType}
                value={docType}
              >
                <option value="" defaultChecked disabled>
                  Enter Document type
                </option>
                {/* PDF/XLS/ .CSV/Microsoft Word */}
                <option value="pdf">PDF</option>
                <option value="xls">XLS</option>
                <option value="csv">CSV</option>
                <option value="word">Microsoft Word</option>
              </select>
            </div>

            <div className="grid grid-cols-12 my-8">
              <label
                htmlFor="IDYear"
                className="text-md font-bold mx-5 col-span-3 flex justify-start items-center"
              >
                Select Year
              </label>
              <select
                id="IDYear"
                className="text-md font-semibold border-2 w-auto p-2 col-span-9"
                onChange={onChangeYear}
                value={year}
              >
                <option value="" defaultChecked disabled>
                  Select year
                </option>
                <option value={"1980-1990"}>1980-1990</option>
                <option value={"1990-2000"}>1990-2000</option>
                <option value={"2000-2010"}>2000-2010</option>
                <option value={"2010-2020"}>2010-2020</option>
                <option value={"2020-2024"}>2020-2024</option>
              </select>
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
          {webCrawlerAddContextRes?.data &&
            webCrawlerAddContextRes?.data?.available_links?.map((link) => {
              return (
                <div
                  className="py-2 border-2 rounded-lg grid grid-cols-12 gap-x-6 px-6 w-full"
                  key={nanoid()}
                >
                  <p className="break-all col-span-10">{link}</p>
                  <div className="flex justify-end items-center   w-full col-span-2">
                    <Button
                      variant={"default"}
                      className="bg-green-600 text-white rounded-[.450rem] hover:bg-green-800"
                      type="button"
                      onClick={() => onClickURLByRes(link)}
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              );
            })}

          {webCrawlerAddrUrlRes?.isLoading ||
          webCrawlerAddContextRes?.isLoading ? (
            <Ldr className="w-full" size={"sm"} />
          ) : (
            <></>
          )}
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
