import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import Footer from "./Footer";
const DynamicNav = dynamic(() => import("./NavBar"), {
  ssr: false,
});
function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <DynamicNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
