"use client";

import { useState } from "react";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import NavLink from "./NavLink";

import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    toast("Logout successful!", {
      style: {
        color: "#00c950",
      },
    });
    router.push("/signin");
    router.refresh();
  };
  return (
    <div className="sticky top-0 z-40 border-b border-white/10 bg-[#131129]/60 backdrop-blur-xl text-white">
      <nav className="container mx-auto px-4 md:px-0 relative">
        <header className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hamburger Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white hover:text-[#6f4ff2] transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            <Link href="/" className="flex items-center gap-3">
              <Image src={Logo} alt="ArtHub" width={40} height={40} />
              <p className="font-extrabold text-[#6f4ff2] text-2xl tracking-tight">
                Art<span className="text-white">Hub</span>
              </p>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-4 lg:flex text-slate-200 font-semibold">
            <li>
              <NavLink href="/" className="font-medium text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink href="/artworks" className="font-medium text-white">
                Browse Artworks
              </NavLink>
            </li>
            {user?.role == "buyer" && (
              <li>
                <NavLink href="/pricing" className="font-medium text-white">
                  Pricing
                </NavLink>
              </li>
            )}
          </ul>

          <div className="items-center gap-4 flex">
            {user ? (
              <Dropdown>
                <Button
                  aria-label="Menu"
                  className="py-6 bg-[#131129]/80 backdrop-blur-lg text-white"
                  variant="secondary"
                >
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
                  </Avatar>{" "}
                  <span className="text-white">
                    Hi, {user?.name.split(" ")[0]} !
                  </span>
                </Button>

                <Dropdown.Popover>
                  <Dropdown.Menu
                    className="bg-[#131129] text-white border border-white/10"
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item
                      id="new-file"
                      textValue="New file"
                      className="hover:bg-white/5"
                    >
                      <div>
                        <h3 className="font-semibold">{user?.name}</h3>
                        <small className="text-slate-400">{user?.email}</small>
                      </div>
                    </Dropdown.Item>
                    <Dropdown.Item className="hover:bg-white/5">
                      <NavLink
                        href={`/dashboard/${user?.role}`}
                        className="font-medium"
                        aria-current="page"
                      >
                        Dashboard
                      </NavLink>
                    </Dropdown.Item>

                    <Dropdown.Item className="hover:bg-white/5 p-1">
                      <Button
                        onClick={handleSignOut}
                        className="w-full bg-[#6f4ff2] hover:bg-[#5b3ed4] text-white font-semibold transition-colors"
                      >
                        <IoIosLogOut /> Log Out
                      </Button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ) : (
              <>
                <Link href="/signin">
                  <Button className="bg-transparent border border-white/20 text-white font-semibold hover:bg-white/10 rounded-lg transition-colors">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-[#6f4ff2] font-semibold hover:bg-[#5b3ed4] text-white rounded-lg transition-colors shadow-md">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>
        </header>

        {isMenuOpen && (
          <div className="w-50 absolute top-[calc(100%+8px)] left-4 right-4 z-50 lg:hidden rounded-xl border border-white/10 bg-[#1c1a36] backdrop-blur-md p-3 shadow-2xl transition-all duration-200 ease-out">
            <ul className="flex flex-col gap-1 text-slate-200">
              <li>
                <NavLink
                  onClick={() => setIsMenuOpen(false)}
                  href="/"
                  className="block py-3 px-4 rounded-lg hover:bg-white/5 hover:text-[#6f4ff2] font-medium transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="/artworks"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg hover:bg-white/5 hover:text-[#6f4ff2] font-medium transition-colors"
                >
                  Browse Artworks
                </NavLink>
              </li>
              {user?.role == "buyer" && (
                <li>
                  <NavLink
                    href="/pricing"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-white/5 hover:text-[#6f4ff2] font-medium transition-colors"
                  >
                    Pricing
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
