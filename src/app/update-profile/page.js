"use client";
import { useState } from "react";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const loading = useProtectedRoute();
  const { user, updateUser } = useAuth(); // ✅ FIXED
  const router = useRouter();

  const [name, setName] = useState(() => user?.name || "");
  const [image, setImage] = useState(() => user?.photo || "");

  const handleUpdate = (e) => {
    e.preventDefault();

    try {
      updateUser(name, image); // ✅ update context directly

      toast.success("Profile Updated!");
      router.push("/profile");
    } catch (e) {
      toast.error("Update failed!");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">
            Update Profile
          </h2>

          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              className="input input-bordered w-full"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />

            <button type="submit" className="btn btn-primary w-full">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}