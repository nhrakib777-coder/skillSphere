"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export const useProtectedRoute = () => {
  const { isLoggedIn, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?redirect=" + window.location.pathname);
    }
  }, [status, isLoggedIn, router]);

  return status === "loading";
};