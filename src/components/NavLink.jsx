import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, className, onClick }) => {
  const pathName = usePathname();

  const isActive = href == pathName;

  return (
    <Link
      href={href}
      className={`${isActive ? "text-[#6f4ff2]" : "text-[#fff]"}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavLink;
