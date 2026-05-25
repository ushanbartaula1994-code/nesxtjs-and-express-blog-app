"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/posts");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4">
      <div className="text-center space-y-6 max-w-xl">
        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome to Blog App
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-lg">
          Read, write, and share amazing blogs with a modern experience.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-4 pt-2">
          <Link href="/login">
            <Button className="px-6 cursor-pointer rounded-full">Login</Button>
          </Link>

          <Link href="/register">
            <Button
              variant="outline"
              cursor-pointer
              className="px-6 rounded-full"
            >
              Register
            </Button>
          </Link>

          <Link href="/posts">
            <Button variant="ghost" className="rounded-full cursor-pointer">
              Explore Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
