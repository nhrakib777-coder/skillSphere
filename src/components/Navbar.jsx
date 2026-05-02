"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "./Loader";

const Navbar = () => {
  const { isLoggedIn, user, logout, status } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // 🔹 Active link style
  const linkClass = (path) =>
    `block py-2 px-3 rounded-md transition ${
      pathname === path
        ? "text-primary bg-primary/10 font-semibold"
        : "hover:text-primary hover:bg-gray-100"
    }`;

  // 🔹 Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/courses?search=${search}`);
    setSearch("");
    setMenuOpen(false); // close mobile menu after search
  };

  // 🔹 Loading
  if (status === "loading") {
    return (
      <div className="h-16 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillSphere
        </Link>

        {/* 🔍 Search (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border rounded-full px-4 py-1.5 w-72 bg-gray-50"
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm bg-transparent"
          />
          <button className="text-lg">🔍</button>
        </form>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>

          <Link href="/courses" className={linkClass("/courses")}>
            Courses
          </Link>

          {isLoggedIn && (
            <Link href="/profile" className={linkClass("/profile")}>
              My Profile
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {isLoggedIn ? (
            <div className="relative group">
              <button>
                <Image
                  src={
                    user?.photo ||
                    user?.image ||
                    "https://via.placeholder.com/40"
                  }
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border w-[40px] h-[40px] object-cover"
                />
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link href="/login" className="font-medium hover:text-primary">
                Login
              </Link>

              <Link
                href="/register"
                className="bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 📱 Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-5 pt-3 bg-white shadow-lg rounded-b-2xl space-y-4 animate-fadeIn">

          {/* 🔍 Mobile Search */}
          <form
            onSubmit={handleSearch}
            className="flex items-center border rounded-full px-4 py-2 bg-gray-50"
          >
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none text-sm bg-transparent"
            />
            <button className="text-lg">🔍</button>
          </form>

          {/* Divider */}
          <div className="border-t"></div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <Link href="/" className={linkClass("/")} onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link href="/courses" className={linkClass("/courses")} onClick={() => setMenuOpen(false)}>
              Courses
            </Link>

            {isLoggedIn && (
              <Link href="/profile" className={linkClass("/profile")} onClick={() => setMenuOpen(false)}>
                My Profile
              </Link>
            )}
          </div>

          {/* Divider */}
          <div className="border-t"></div>

          {/* Auth Section */}
          {!isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full text-center py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="w-full text-center py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={logout}
              className="w-full py-2 text-red-500 border rounded-lg hover:bg-red-50 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;