import Link from "next/link";
import { useState } from "react";
import { MdOutlineClose, MdOutlineMenu } from "react-icons/md";
import { IoIosLogIn } from "react-icons/io";
import NavLink from "../NavLink";
import ThemeChanger from "../ThemeChanger";
import Logo from "./Logo";
import { siteLinks } from "../../data/siteInfo";
import UserMenu from "../common/UserMenu";
import { authStore } from "../../data/store";
import { useQuery } from "@tanstack/react-query";
import { getMeFn } from "../../data/api/authApi";
import { AxiosError } from "axios";
import { StandardResponse } from "../../data/types/common";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import useLogout from "../../hooks/logout";

const NavBar = () => {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const { isLogedIn, setCredentials } = authStore();
  const logout = useLogout();
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: getMeFn,
    onSuccess(data) {
      setCredentials(data.data);
    },
    enabled: isLogedIn,
    onError: (error: AxiosError<StandardResponse>) => {
      if (!error.response?.data.message) return;
      if ((error.request as { status: number | string }).status === 401) {
        router
          .push("/")
          .then(() => {
            toast.error(error.response?.data.message || "");
            logout();
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  });
  return (
    <header className="relateive sticky top-0 z-50 w-full border-b bg-white/90  backdrop-blur dark:border-gray-700 dark:bg-gray-900/70">
      <div className="flex items-center justify-between px-2 py-5">
        <div className="flex items-center gap-2">
          <button
            className="rounded-md p-1  text-3xl hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-800 dark:focus:bg-gray-800 sm:hidden"
            aria-label="menu"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <MdOutlineClose /> : <MdOutlineMenu />}
          </button>
          <Logo />
        </div>
        <div className="flex w-full items-center justify-end gap-3 space-x-2">
          <div className="hidden gap-2 text-lg sm:flex sm:gap-6 lg:gap-12">
            <NavLink href={"/#feature"} text="Features" />
            <NavLink href={"/#faq"} text="FAQ" />
            <NavLink href={siteLinks.pricing} text="Pricing" />
          </div>
          {menu && (
            <div className="absolute top-[87px] right-0 w-full space-y-2 bg-gray-300 px-2 py-3 dark:bg-gray-800 sm:hidden">
              <div>
                <NavLink href="/#feature" text="Features" />
              </div>
              <div>
                <NavLink href={siteLinks.faq} text="FAQ" />
              </div>
              <div>
                <NavLink href={siteLinks.pricing} text="Pricing" />
              </div>
              <div>
                {isLogedIn ? (
                  <Link
                    className="flex h-9 items-center justify-center rounded bg-brand px-4  text-center   font-semibold text-white transition-all duration-300 hover:brightness-125 focus:outline-none md:flex"
                    href={siteLinks.dashboard}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    className="flex h-9 items-center justify-center rounded bg-brand px-4  text-center   font-semibold text-white transition-all duration-300 hover:brightness-125 focus:outline-none md:flex"
                    href={siteLinks.login}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
          {isLogedIn ? (
            <div className="relative">
              <UserMenu userName={data?.data.userName || ""} />
            </div>
          ) : (
            <>
              <Link
                href={siteLinks.signup}
                className="flex h-9 transform items-center justify-center space-x-2 rounded border-[1.5px] border-brand px-2 text-center  font-semibold text-brand transition-all duration-300 hover:brightness-125"
              >
                <IoIosLogIn />
                <span>Try It Now</span>
              </Link>
              <Link
                className="hidden h-9 transform items-center justify-center rounded bg-brand px-4  text-center   font-semibold text-white transition-all duration-300 hover:brightness-125 focus:outline-none md:flex"
                href={siteLinks.login}
              >
                Login
              </Link>
            </>
          )}
          <ThemeChanger />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
