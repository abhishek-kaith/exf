import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({ href, text }: { href: string; text: string }) => {
  const router = useRouter();
  const active = router.pathname === href ? true : false;
  return (
    <Link className={active ? "text-brand" : "hover:text-brand"} href={href}>
      {text}
    </Link>
  );
};

export default NavLink;
