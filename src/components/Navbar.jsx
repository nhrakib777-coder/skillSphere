"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `block px-4 py-3 text-lg ${
      isActive(path) ? "text-primary font-bold" : ""
    }`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/courses?search=${search}`);
    setSearch("");
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary">
            SkillSphere
          </Link>

          {/* Search (always visible) */}
          <form
            onSubmit={handleSearch}
            className="flex border rounded-full px-3 py-1 w-40 md:w-64"
          >
            <input
              suppressHydrationWarning

              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="flex-1 outline-none text-sm"
            />
          </form>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/courses" className={linkClass("/courses")}>Courses</Link>

            {isLoggedIn && (
              <Link href="/profile" className={linkClass("/profile")}>
                Profile
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Image
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="user"
                  width={40}
                  height={40}
                  className="w-[40px] h-[40px] rounded-full"
                />
                <button onClick={logout} className="text-red-500">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register" className="bg-primary text-white px-3 py-1 rounded">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* 🔥 FULL SCREEN MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[999]">

          {/* Slide panel */}
          <div className="fixed top-0 left-0 w-72 h-full bg-white shadow-lg p-5">

            {/* Close button */}
            <button
              className="text-2xl mb-6"
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

            {/* Links */}
            <div className="space-y-3">
              <Link href="/" onClick={() => setMenuOpen(false)} className={linkClass("/")}>
                Home
              </Link>

              <Link href="/courses" onClick={() => setMenuOpen(false)} className={linkClass("/courses")}>
                Courses
              </Link>

              {isLoggedIn && (
                <Link href="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
              )}
            </div>

            {/* Auth */}
            <div className="mt-6 border-t pt-4">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-red-500"
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="bg-primary text-white px-3 py-2 rounded"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}