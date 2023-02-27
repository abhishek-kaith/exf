import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoMdCash } from "react-icons/io";
import {
  MdClose,
  MdDashboard,
  MdLogout,
  MdTextRotationAngledown,
} from "react-icons/md";
import { TbMathFunction } from "react-icons/tb";
import { siteLinks } from "../../../../data/siteInfo";
import useLogout from "../../../../hooks/logout";
function Sidebar({ showSideBarOnMobile }: { showSideBarOnMobile: boolean }) {
  const logout = useLogout()
  return (
    <aside
      className={`${
        showSideBarOnMobile ? "h-fit" : "hidden"
      } w-full shrink-0 overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800 md:block md:h-full  md:w-72`}
      aria-label="Sidebar"
    >
      <div className="flex h-full flex-col items-stretch justify-between">
        <ul className="space-y-2">
          <SidebarListItem
            href={siteLinks.dashboard}
            text="Dashboard"
            icon={<MdDashboard />}
          />
          <SidebarListItem
            href={siteLinks.genrateFormula}
            text="Genrate Formula"
            icon={<TbMathFunction />}
          />
          <SidebarListItem
            href={siteLinks.explainFormula}
            text="Explain Formula"
            icon={<MdTextRotationAngledown />}
          />
        </ul>
        <div>
          <SidebarListItem
            href={siteLinks.billing}
            text="Billing"
            icon={<IoMdCash />}
          />
          <button onClick={()=>logout()} className="w-full flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
            <MdLogout />
            <span className="ml-3">Logout</span>
          </button>
          <SideBarCta />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

const SidebarListItem = ({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon: JSX.Element;
}) => {
  const router = useRouter();
  const active = router.pathname === href ? true : false;
  return (
    <li>
      <Link
        className={`flex items-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
          active ? "bg-gray-100 dark:bg-gray-700" : ""
        }`}
        href={href}
      >
        {icon}
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
};

const SideBarCta = () => {
  const [showCta, setShowCta] = useState(true);
  return (
    <div
      className={`mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900 ${
        !showCta ? "hidden" : ""
      }`}
      role="alert"
    >
      <div className="items-centerNavLink mb-3 flex">
        <span className="mr-2 rounded bg-orange-100 px-2.5 py-0.5 text-sm font-semibold text-orange-800 dark:bg-orange-200 dark:text-orange-900">
          Beta
        </span>
        <button
          onClick={() => setShowCta(false)}
          type="button"
          className="-mx-1.5 -my-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-blue-50 p-1 text-blue-900 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <MdClose />
        </button>
      </div>
      <p className="mb-3 text-sm text-blue-900 dark:text-blue-400">
        Preview the new formula dashboard navigation! You can turn the new
        navigation off for a limited time in your profile.
      </p>
      <a
        className="text-sm text-blue-900 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        href="#"
      >
        Turn new navigation off
      </a>
    </div>
  );
};
