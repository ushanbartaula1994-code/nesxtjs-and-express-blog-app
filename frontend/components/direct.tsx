"use client";
import { useAuth } from "@/app/context/authContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return <p className="text-black font-semibold text-xl">Loading..</p>;
  }

  return <div>welcome {user?.fullname}</div>;
}
