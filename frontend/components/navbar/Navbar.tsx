"use client";

import {useEffect} from 'react'
import { useAuth } from "@/app/context/authContext";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function Navbar() {
  const { isLoading, isAuthenticated, logOut, logIn, user } = useAuth();
   useEffect(() => {
     console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
   }, []);
   const pathname = usePathname();
   const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-5 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-6xl mx-4 px-6 py-3 flex items-center justify-between rounded-2xl bg-[#f9f6f2]/70 border border-slate-200/60 backdrop-blur-xl shadow-xl">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={42}
            height={42}
            className="rounded-full"
          />
          <span className="text-lg font-semibold text-slate-800 tracking-tight">
            BlogApp
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          {!isAuthenticated && (
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-sm text-slate-600 hover:text-slate-900 hover:bg-white/60 transition cursor-pointer"
            >
              Home
            </Link>
          )}

          {isAuthenticated && (
            <>
              <Link
                href="/posts"
                className={`px-4 py-2 rounded-full text-sm  transition ${isActive('/posts')?"bg-white/80 text-slate-900 shadow-sm":" text-slate-600 hover:text-slate-900 hover:bg-white/60"}`}
              >
                Posts
              </Link>

              <Link
                href="/createpost"
                className="px-4 py-2 rounded-full text-sm text-slate-600 hover:text-slate-900 hover:bg-white/60 transition"
              >
                Create Post
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <Link
              href="/register"
              className="px-4 py-2 rounded-full text-sm text-slate-600 hover:text-slate-900 hover:bg-white/60 transition"
            >
              Register
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <span className="text-sm text-slate-500">Loading...</span>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-xs px-3 py-1 rounded-full bg-white/60 border border-slate-200 text-slate-700">
                {user?.fullname}
              </span>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full cursor-pointer border-slate-200 text-slate-700 hover:bg-slate-100"
                  >
                    Logout
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent className="rounded-2xl">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be signed out of your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={logOut}
                      className="cursor-pointer"
                    >
                      Logout
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <>
              <Button
                onClick={logIn}
                className="cursor-pointer rounded-full bg-slate-900 text-white hover:bg-slate-800"
              >
                Login
              </Button>

              <Link href="/register">
                <Button
                  variant="outline"
                  className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
