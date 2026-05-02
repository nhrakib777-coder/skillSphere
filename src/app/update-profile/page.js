"use client";

import { useState } from "react";
import { useProtectedRoute } from "@/utils/protectedRoute";
import Loader from "@/components/Loader";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function UpdateProfile() {
  const loading = useProtectedRoute();
  const { user, updateUser } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [saving, setSaving] = useState(false);

  if (loading) return <Loader />;

  // safety guard
  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>User not found</p>
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    // ✅ validation
    if (!name.trim()) {
      return toast.error("Name cannot be empty");
    }

    try {
      setSaving(true);

      updateUser(
        name,
        image || "https://via.placeholder.com/150"
      );

      toast.success("Profile updated successfully 🎉");

      router.push("/profile");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">

      <div className="card bg-base-100 shadow-xl p-6">

        <h2 className="text-2xl font-bold text-center mb-4">
          Update Profile
        </h2>

        {/* Preview */}
        <div className="flex justify-center mb-4">
          <Image
            src={image || user.image || "https://via.placeholder.com/100"}
            alt="Preview"
            width={100}
            height={100}
            className="rounded-full object-cover border w-[100px] h-[100px]"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
          />

          <input
            className="input input-bordered w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />

          <button
            type="submit"
            className="btn bg-blue-600 p-2 w-full"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Profile"}
          </button>

        </form>
      </div>
    </div>
  );
}