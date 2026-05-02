"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const useProtectedRoute = () => {
  const { status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // ✅ wait until auth check finishes
    if (status === "unauthenticated") {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [status, pathname, router]);

  // ✅ return loading state for UI
  return status === "loading";
};