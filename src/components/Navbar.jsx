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
    `font-medium transition ${
      pathname === path
        ? "text-primary border-b-2 border-primary pb-1"
        : "hover:text-primary"
    }`;

  // 🔹 Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/courses?search=${search}`);
    setSearch("");
  };

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

        {/* 🔍 Search Bar (Desktop) */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border rounded-full px-3 py-1 w-72"
        >
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none px-2 text-sm bg-transparent"
          />
          <button type="submit">🔍</button>
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
            className="md:hidden text-xl"
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
                  className="rounded-full border"
                />
              </button>

              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
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
            <>
              <Link href="/login" className="font-medium hover:text-primary">
                Login
              </Link>

              <Link
                href="/register"
                className="bg-primary text-white px-5 py-2 rounded-full hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* 📱 Mobile Menu + Search */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="flex border rounded-full px-3 py-1">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none px-2 text-sm bg-transparent"
            />
            <button type="submit">🔍</button>
          </form>

          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/courses" className={linkClass("/courses")}>Courses</Link>

          {isLoggedIn && (
            <Link href="/profile" className={linkClass("/profile")}>
              My Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;