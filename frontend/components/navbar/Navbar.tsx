"use client";

import {useEffect} from 'react'
import { useAuth } from "@/app/context/authContext";
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-6 md:px-10 h-20">
        
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.jpg"
            alt="logo"
            width={42}
            height={42}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-slate-800">BlogApp</span>
          
        </Link>

     
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          {!isAuthenticated && (
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          )}

          {isAuthenticated && (
            <>
              <Link href="/posts" className="hover:text-blue-600 transition">
                Posts
              </Link>

              <Link
                href="/createpost"
                className="hover:text-blue-600 transition"
              >
                Create Post
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <Link href="/register" className="hover:text-blue-600 transition">
              Register
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <span className="text-sm text-slate-500">Loading...</span>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white font-medium uppercase py-1 px-1 rounded hidden bg-black  sm:block">
                {user?.fullname}
              </span>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Logout</Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
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
              <Button onClick={logIn} className="rounded-full">
                Login
              </Button>

              <Link href="/register">
                <Button variant="outline" className="rounded-full">
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
