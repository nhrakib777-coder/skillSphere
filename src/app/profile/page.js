"use client";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  const loading = useProtectedRoute();
  const { user } = useAuth(); // ✅ FIXED

  if (loading) return <Loader />;

  if (!user) return null; // safety guard

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card bg-base-100 shadow-xl text-center">
        <div className="card-body">
          <Image
            src={user.photo}
            alt="Profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full mx-auto"
          />

          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p>{user.email}</p>

          <Link href="/profile/update" className="btn btn-primary mt-4">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}