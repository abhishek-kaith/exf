import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  const [showSideBarOnMobile, setShowSideBarOnMobile] = useState(false);
  return (
    <main className="h-screen overflow-hidden bg-gray-50 text-gray-800 antialiased dark:bg-gray-800 dark:text-gray-100">
      <Header
        sideBarState={showSideBarOnMobile}
        toggleSideBar={() => setShowSideBarOnMobile(!showSideBarOnMobile)}
      />
      <div className="overflow-auto h-[calc(100%-75px)]  md:flex">
        <Sidebar showSideBarOnMobile={showSideBarOnMobile} />
        <div className="w-full overflow-auto">{children}</div>
      </div>
    </main>
  );
}

export default Layout;
