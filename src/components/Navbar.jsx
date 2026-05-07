"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path) => pathname === path;
  const linkClass = (path) =>
    `px-4 py-2 rounded-lg transition-all ${
      isActive(path) ? "bg-primary text-white font-medium" : "hover:bg-gray-100"
    }`;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/courses?search=${search}`);
    setMenuOpen(false);
    setSearch("");
  };

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
            SkillSphere
          </Link>

          <form onSubmit={handleSearch} className="hidden sm:flex flex-1 max-w-sm mx-4">
            <div className="w-full flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none bg-transparent text-sm"
              />
              <button type="submit">🔍</button>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-2">
            <Link href="/" className={linkClass("/")}>Home</Link>
            <Link href="/courses" className={linkClass("/courses")}>Courses</Link>
            {isLoggedIn && <Link href="/profile" className={linkClass("/profile")}>My Profile</Link>}
          </div>

          <div className="hidden md:flex items-center gap-3 ml-2">
            {isLoggedIn && user ? (
              <div className="flex items-center gap-3">
                <img
                  src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=random"}
                  alt="Profile"
                  width={38}
                  height={38}
                  className="rounded-full object-cover border border-gray-200 w-[38px] h-[38px]"
                />
                <button onClick={handleLogout} className="text-red-500 font-medium hover:text-red-600">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="font-medium text-gray-700 hover:text-primary">Login</Link>
                <Link href="/register" className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:shadow-md">Register</Link>
              </div>
            )}
          </div>

          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(true)}>☰</button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[999] transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setMenuOpen(false)} />
        <div className={`absolute top-0 left-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-2xl">✕</button>
          </div>

          <form onSubmit={handleSearch} className="p-4 border-b">
            <div className="flex items-center border rounded-full px-3 py-2 bg-gray-50">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none text-sm"
              />
              <button type="submit">🔍</button>
            </div>
          </form>

          {isLoggedIn && user && (
            <div className="p-4 border-b flex items-center gap-3">
              <img
                src={user.photoURL || "https://ui-avatars.com/api/?name=User&background=random"}
                alt="User"
                width={50}
                height={50}
                className="rounded-full w-12 h-12 object-cover"
              />
              <div>
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          <div className="p-4 space-y-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block p-3 rounded-lg hover:bg-gray-100">Home</Link>
            <Link href="/courses" onClick={() => setMenuOpen(false)} className="block p-3 rounded-lg hover:bg-gray-100">Courses</Link>
            {isLoggedIn && <Link href="/profile" onClick={() => setMenuOpen(false)} className="block p-3 rounded-lg hover:bg-gray-100">My Profile</Link>}
          </div>

          <div className="absolute bottom-0 left-0 w-full p-4 border-t">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="w-full bg-red-500 text-white py-3 rounded-lg">Logout</button>
            ) : (
              <div className="space-y-3">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="block text-center border py-3 rounded-lg">Login</Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="block text-center bg-primary text-white py-3 rounded-lg">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}