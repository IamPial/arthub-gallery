"use client";

import { useState } from "react";
import {
  FiUser,
  FiShoppingBag,
  FiList,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
  FiPlusCircle,
  FiPieChart,
  FiActivity,
} from "react-icons/fi";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const dashboardItems = {
  buyer: [
    { name: "Purchase History", icon: <FiList />, href: "/dashboard/buyer" },
    {
      name: "Bought Artworks",
      icon: <FiShoppingBag />,
      href: "/dashboard/buyer/artworks",
    },
    {
      name: "Profile Management",
      icon: <FiUser />,
      href: "/dashboard/buyer/profiles",
    },
  ],
  artist: [
    { name: "Manage Artworks", icon: <FiList />, href: "/dashboard/artist" },
    {
      name: "Add Artwork",
      icon: <FiPlusCircle />,
      href: "/dashboard/artist/add",
    },
    {
      name: "Sales History",
      icon: <FiShoppingBag />,
      href: "/dashboard/artist/sales-history",
    },
    {
      name: "Profile Management",
      icon: <FiUser />,
      href: "/dashboard/artist/profiles",
    },
  ],
  admin: [
    {
      name: "Analytics Overview",
      icon: <FiPieChart />,
      href: "/dashboard/admin",
    },
    {
      name: "Manage Users",
      icon: <FiUser />,
      href: "/dashboard/admin/user-managements",
    },
    {
      name: "Manage All Artworks",
      icon: <FiList />,
      href: "/dashboard/admin/all-artworks",
    },
    {
      name: "All Transactions",
      icon: <FiActivity />,
      href: "/dashboard/admin/transactions",
    },
  ],
};

const DashBoardSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const role = user?.role;
  const navItems = dashboardItems[role] || dashboardItems["buyer"];

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-[#1a163a] border-b border-white/5 w-full fixed top-0 left-0 z-50">
        <span className="font-bold text-xl tracking-wider text-[#6f4ff2]">
          ArtHub
        </span>
        <Button
          isIconOnly
          variant="light"
          onClick={() => setIsOpen(!isOpen)}
          className="text-white"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </Button>
      </div>

      <aside
        className={`fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-[#1a163a]/95 md:bg-[#1a163a]/60 backdrop-blur-xl border-r border-white/5 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:flex"
        }`}
      >
        <div className="flex flex-col gap-8 pt-20 md:pt-0">
          <div className="hidden md:block">
            <Link
              href="/"
              className="font-extrabold text-2xl tracking-wider text-white"
            >
              Art<span className="text-[#6f4ff2]">Hub</span>
            </Link>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">
              {role} Dashboard
            </p>
          </div>

          <nav className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <span
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#6f4ff2] text-white shadow-lg shadow-[#6f4ff2]/20"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-2 mt-auto pt-6">
          <Button className="bg-red-500/80  text-white flex items-center justify-start gap-4 px-4 py-3.5 rounded-xl font-medium w-full hover:bg-red-500/10 hover:text-danger">
            <FiLogOut className="text-lg" />
            Logout
          </Button>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex border border-white/50 items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium text-sm transition-all"
          >
            <FiHome className="text-lg" />
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DashBoardSideBar;
