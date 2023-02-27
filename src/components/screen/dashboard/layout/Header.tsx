import React from "react";
import { MdClose, MdOutlineMenu } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { useRouter } from "next/router";
import { authStore } from "../../../../data/store";
import { getMeFn } from "../../../../data/api/authApi";
import { StandardResponse } from "../../../../data/types/common";
import { siteLinks } from "../../../../data/siteInfo";
import toast from "react-hot-toast";
import ThemeChanger from "../../../ThemeChanger";
import Logo from "../../../layout/Logo";
import UserMenu from "../../../common/UserMenu";
function Header({
  toggleSideBar,
  sideBarState,
}: {
  toggleSideBar: () => void;
  sideBarState: boolean;
}) {
  const router = useRouter();
  const setUser = authStore((state) => state.setCredentials);
  const logOut = authStore((state) => state.logout);
  const isLogedIn = authStore((state) => state.isLogedIn);
  const { data } = useQuery(["me"], getMeFn, {
    enabled: isLogedIn,
    onSuccess(data) {
      setUser(data.data);
    },
    onError: (error: AxiosError<StandardResponse>) => {
      if (!error.response?.data.message) return;
      if ((error.request as { status: number | string }).status === 401) {
        router
          .push(siteLinks.home)
          .then(() => {
            toast.error(error.response?.data.message || "");
            logOut();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  });
  return (
    <header className="bg-gray-50 dark:bg-gray-800">
      <nav className="flex h-16 items-center justify-between gap-2 p-2">
        <div className="flex">
          <button
            onClick={toggleSideBar}
            className={`rounded-md p-1 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none dark:hover:bg-gray-700 dark:focus:bg-gray-700 md:hidden`}
            aria-label="hide or show sidebar"
          >
            {!sideBarState ? (
              <MdOutlineMenu className="h-6 w-6 " />
            ) : (
              <MdClose className="h-6 w-6" />
            )}
          </button>
          <Logo />
        </div>
        <div className="relative flex items-center gap-2">
          <ThemeChanger />
          {data?.data && (
            <div className="relative">
              <UserMenu userName={data.data.userName} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
