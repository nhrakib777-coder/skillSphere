"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react";
import Loader from "./Loader";

const Navbar = () => {
  const { isLoggedIn, user, logout, status } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Better loading handling
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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-medium hover:text-primary transition">
            Home
          </Link>

          <Link href="/courses" className="font-medium hover:text-primary transition">
            Courses
          </Link>

          {isLoggedIn && (
            <Link href="/profile" className="font-medium hover:text-primary transition">
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
              {/* Avatar Button */}
              <button className="focus:outline-none">
                <Image
                  src={user?.image || user?.photo || "https://via.placeholder.com/40"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full border"
                />
              </button>

              {/* Dropdown */}
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
                className="bg-primary text-white px-5 py-2 rounded-full btn-hover"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow">
          <Link href="/" className="block">Home</Link>
          <Link href="/courses" className="block">Courses</Link>

          {isLoggedIn && (
            <Link href="/profile" className="block">My Profile</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;