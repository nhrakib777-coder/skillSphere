"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loader from "./Loader";

const Navbar = () => {
  const { isLoggedIn, user, logout, loading } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // 🔥 close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `px-3 py-2 rounded-md transition ${
      isActive(path)
        ? "text-primary bg-primary/10 font-semibold"
        : "hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/courses?search=${search}`);
    setSearch("");
    setMenuOpen(false);
  };

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
  };

  if (loading) {
    return (
      <div className="h-16 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillSphere
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center w-72 px-4 py-1.5 rounded-full border bg-gray-50 dark:bg-gray-800"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="flex-1 bg-transparent outline-none text-sm dark:text-white"
          />
          <button>🔍</button>
        </form>

        {/* Links */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/courses" className={linkClass("/courses")}>Courses</Link>

          {isLoggedIn && (
            <Link href="/profile" className={linkClass("/profile")}>
              Profile
            </Link>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">

          {/* Dark mode */}
          <button
            onClick={toggleDark}
            className="px-2 py-1 border rounded-full"
          >
            🌙
          </button>

          {/* Mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* AUTH */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>

              {/* Avatar */}
              <button onClick={() => setProfileOpen(!profileOpen)}>
                <Image
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 object-cover"
                />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link href="/login" className="px-3 py-2 hover:text-primary">
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 bg-primary text-white rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden p-4 space-y-4 bg-white dark:bg-gray-900">

          <form onSubmit={handleSearch} className="flex border p-2 rounded-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent"
              placeholder="Search"
            />
          </form>

          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/courses" className={linkClass("/courses")}>Courses</Link>

          {isLoggedIn && (
            <Link href="/profile" className={linkClass("/profile")}>Profile</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;