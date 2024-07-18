import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoonIcon,
  SunIcon,
  DesktopIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import logo from "../../../assets/simplyfiLogo.png";
import logo1 from "../../../assets/KPMG_logo.svg.png";

import { NavLink } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { togglePicQuest } from "@/store/slices/sideBarToggleSlice";
import { RootState } from "@/store";

type HeaderPropsType = {
  // isShowSideBar: boolean;
  // setIsShowSideBar: Dispatch<SetStateAction<boolean>>;
  nav: {
    name: string;
    link: string;
  }[];
};

export const Header: FC<HeaderPropsType> = (props) => {
  const [theme, setTheme] = useState<string | null>(null);
  const dispatch = useDispatch();
  const IsPicQuestSideBarOpenState = useSelector(
    (state: RootState) => state.handleSideBars.IsPicQuestSideBarOpen
  );
  const onClickHamburgerMenu = () => {
    dispatch(togglePicQuest());
  };

  // useEffect(() => {
  // props?.setIsShowSideBar(togglePicQuestResponse);
  // dispatch(togglePicQuest())
  // }, [IsPicQuestSideBarOpenState]);

  useEffect(() => {
    if (theme !== null) {
      if (theme === "system") {
        if (isCurrentThemeDark()) {
          const root = window.document.documentElement;
          root.classList.remove("light");
          root.classList.add("dark");
        } else {
          const root = window.document.documentElement;
          root.classList.remove("dark");
          root.classList.add("light");
        }
        localStorage.setItem("theme", "system");
      } else {
        const colorTheme = theme === "dark" ? "light" : "dark";
        const root = window.document.documentElement;
        root.classList.remove(colorTheme);
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
      }
    } else {
      if (
        localStorage.getItem("theme") !== undefined &&
        localStorage.getItem("theme") !== null
      ) {
        const themeTmp = localStorage.getItem("theme");
        setTheme(themeTmp);
      } else {
        if (isCurrentThemeDark()) {
          const root = window.document.documentElement;
          root.classList.remove("light");
          root.classList.add("dark");
        } else {
          const root = window.document.documentElement;
          root.classList.remove("dark");
          root.classList.add("light");
        }
        setTheme("system");

        localStorage.setItem("theme", "system");
      }
    }
  }, [theme]);

  const isCurrentThemeDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <header className="h-[3.6rem] grid grid-cols-12 dark:bg-[#000] ">
      <nav className="col-span-8 flex justify-start items-center h-full px-5 gap-28">
        <div className=" text-[#454343] flex gap-10 items-center ">
          <span
            className={`p-2 hover:bg-[#dfdbdb] dark:hover:bg-[#353535] rounded-full ${
              IsPicQuestSideBarOpenState ? "dark:bg-[#343333] bg-[#dfdbdb]" : ""
            }`}
          >
            <HamburgerMenuIcon
              className={`w-5 h-5 cursor-pointer hover:scale-105 dark:text-white  `}
              onClick={onClickHamburgerMenu}
            />
          </span>
          <img src={logo1} alt="logo" className="h-[2.3rem] w-auto inline" />
          {/* <h1 className="text-[1rem] font-bold dark:text-white logo-font bg-white dark:bg-black">
            KPMG
          </h1> */}
        </div>
        <ul className="flex gap-2 text-[#646363] dark:text-[#e7e4e4] text-sm bg-white dark:bg-black">
          {props?.nav?.map((eachEle) => (
            <NavLink
              to={eachEle?.link}
              className={({ isActive }) =>
                isActive ? `active-nav nav-font` : `inactive-nav`
              }
              key={nanoid()}
            >
              <span className=" logo-font">{eachEle?.name}</span>
            </NavLink>
          ))}
        </ul>
      </nav>
      <div className="col-span-4 px-5">
        <div className=" flex justify-end gap-10 items-center h-full ">
          <span className=" dark:text-white flex items-center gap-4">
            <h4 className="text-sm italics">Powered by</h4>{" "}
            <span>
              {" "}
              <img src={logo} alt="logo" className="h-[2.3rem] w-auto inline" />
              <h4 className="text-sm font-semibold inline mx-1 nav-font">
                Simplyfi
              </h4>
            </span>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="destructive"
                size={"sm"}
                className="hover:bg-[#c7c7c7] dark:hover:bg-[#757373] rounded-[.4rem] dark:text-[#fff]"
              >
                {theme === "dark" ? (
                  <MoonIcon className="w-6 h-6 mx-auto " />
                ) : (
                  <></>
                )}
                {theme === "light" ? (
                  <SunIcon className="w-6 h-6 mx-auto" />
                ) : (
                  <></>
                )}
                {theme === "system" ? (
                  <DesktopIcon className="w-6 h-6 mx-auto" />
                ) : (
                  <></>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-32 max-w-32 bg-[#fff] dark:bg-[#544d4d] rounded-[0.4rem] "
              side="bottom"
              align="center"
            >
              <DropdownMenuRadioGroup
                value={theme ? theme : ""}
                onValueChange={setTheme}
                className=""
              >
                <DropdownMenuRadioItem
                  value="dark"
                  className={`dark:bg-[#d6d5d5] dark:dark:bg-[#5a5858] p-3 w-full`}
                >
                  <MoonIcon className="w-4 h-4 mx-auto text-[#000] dark:text-[#fff]" />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="light"
                  className={`dark:bg-[#d6d5d5] dark:dark:bg-[#5a5858] p-3 w-full`}
                >
                  <SunIcon className="w-4 h-4 mx-auto text-[#000] dark:text-[#fff]" />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="system"
                  className={`dark:bg-[#d6d5d5] dark:dark:bg-[#5a5858] p-3 w-full`}
                >
                  <DesktopIcon className="w-4 h-4 mx-auto text-[#000] dark:text-[#fff]" />
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
