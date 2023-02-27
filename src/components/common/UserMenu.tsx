import { Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import useLogout from "../../hooks/logout";

export default function NavUserA({ userName }: { userName: string }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
  ];
  const logout = useLogout();
  return (
    <Menu>
      <Menu.Button className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600">
        {userName[0]?.toUpperCase()}
      </Menu.Button>
      <Menu.Items className="absolute -right-2 z-40 mt-3 w-64 space-y-2 rounded-md border bg-gray-100 p-4 shadow-md dark:border-gray-600 dark:bg-gray-700">
        {links.map((link) => (
          <MenuItem href={link.href} text={link.label} key={link.href} />
        ))}
        <Menu.Item>
          <div
            className={
              "flex h-12 cursor-pointer items-center rounded-lg p-4 font-mono transition-colors duration-300 hover:bg-slate-200 dark:text-gray-200 dark:hover:bg-gray-600"
            }
            onClick={() => {
              logout();
            }}
          >
            Logout
          </div>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
}
function MenuItem({ href, text }: { href: string; text: string }) {
  const router = useRouter();
  const active = router.pathname === href ? true : false;
  return (
    <Menu.Item>
      <span
        className={`${
          active ? "bg-slate-200 dark:bg-gray-600" : ""
        } flex h-12 cursor-pointer items-center rounded-lg  p-4 font-mono transition-colors duration-300 hover:bg-slate-200 dark:text-gray-200 dark:hover:bg-gray-600`}
        onClick={async () => {
          await router.push(href);
        }}
      >
        {text}
      </span>
    </Menu.Item>
  );
}
