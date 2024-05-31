import { FC, ReactNode } from "react";
import { Header } from "../components/custom/header/Header";

type GenericLayoutPropsType = {
  children: ReactNode;
};

export const GenericLayout: FC<GenericLayoutPropsType> = (props) => {
  return (
    <>
      <Header
        nav={[
          {
            link: "PicQuest",
            name: "BankGPT",
          },
          // {
          // 	link: 'ReportComply',
          // 	name: 'ReportComply',
          // },
          // {
          // 	link: 'CompareDocs',
          // 	name: 'CompareDocs',
          // },
          // {
          // 	link: 'DocuSense',
          // 	name: 'DocuSense',
          // },
        ]}
      />

      <div className={`h-[calc(100vh-3.6rem)] w-full flex gap-0`}>
        {props?.children}
      </div>
    </>
  );
};
