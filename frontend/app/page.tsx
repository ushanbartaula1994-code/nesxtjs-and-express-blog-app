"use client";

 import Link from "next/link";
// import { useAuth } from "@/app/context/authContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function HomePage() {
  // const { user, isLoading } = useAuth();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     router.replace("/posts");
  //   }
  // }, [isLoading, user, router]);

  // if (isLoading) {
  //   return (
  //     <div className="w-full min-h-screen flex items-center justify-center">
  //       Loading...
  //     </div>
  //   );
  // }

  // return (
  //   
 export default function HomePage() {

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f9f6f2]">
      <div className="absolute top-25 -left-25 w-100 h-100 bg-pink-200/40 blur-3xl rounded-full" />
      <div className="absolute -bottom-25 -right-25 w-100 h-100 bg-orange-200/40  blur-3xl rounded-full" />
      <div className="relative max-w-6xl mx-auto px-6">
        <section className="flex flex-col items-center text-center mt-40 md:mt-48">
          <p className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-orange-100 text-slate-700 text-xs md:text-sm">
            A Blogging Platform{" "}
          </p>
          <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-800 max-w-4xl leading-tight">
            Write. Share. Inspire.
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl">
            A modern space to publish your thoughts, share stories, and connect
            with readers around the world.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
            <Link href='/register'>
            <button className="px-6 py-3 cursor-pointer rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800 transition">
              Get Started
            </button>
            </Link>
            <Link href="/posts">
            <button className="px-6 py-3 cursor-pointer rounded-xl border border-slate-300 text-slate-700 text-sm hover:bg-slate-100 transition">
              Explore Posts
            </button>
            </Link>

          </div>
        </section>
      
      </div>
    </main>
  );
 }
