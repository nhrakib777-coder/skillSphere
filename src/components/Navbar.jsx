"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Loader from "./Loader";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();

  if (status === "loading") return <Loader />;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          SkillSphere
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/courses" className="font-medium hover:text-primary transition-colors">All Courses</Link>
          {isLoggedIn && <Link href="/profile" className="font-medium hover:text-primary transition-colors">My Profile</Link>}
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <Image
                  src={user?.photo || "https://via.placeholder.com/40"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52">
                <li><Link href="/profile">Profile</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="font-medium hover:text-primary">Login</Link>
              <Link href="/register" className="bg-primary text-white px-5 py-2 rounded-full btn-hover">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;