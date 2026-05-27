"use client";

import Image from "next/image";
import type { Post } from "@/types/types";
import API from "@/lib/api";
import { usePosts } from "@/app/context/postContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  const { refreshPosts } = usePosts();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const ok = confirm("Delete this post?");
    if (!ok) return;

    try {
      setLoading(true);
      await API.delete(`/api/v1/posts/${post._id}`);
      await refreshPosts();
    } catch (err) {
      console.log(err);
      alert("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/posts/edit/${post._id}`);
  };

 return (
   <article className="border-b border-slate-200 py-10">
     {/* IMAGE */}
     {post.image && (
       <div className="relative w-full h-[420px] overflow-hidden rounded-3xl">
         <Image
           src={post.image}
           alt={post.title}
           fill
           className="object-cover"
         />
       </div>
     )}

     
     <div className="mt-6 max-w-3xl">
       
       <div className="flex items-center gap-3 text-sm text-slate-500">
         <span>{post.author?.username}</span>
         <span className="w-1 h-1 rounded-full bg-slate-400" />
         <span>{new Date(post.createdAt).toLocaleDateString()}</span>
       </div>

       
       <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
         {post.title}
       </h2>

       
       <p className="mt-4 text-lg leading-8 text-slate-600 line-clamp-3">
         {post.content}
       </p>

       
       <div className="mt-6 flex items-center gap-3">
         <button
           onClick={handleEdit}
           className="text-sm text-slate-700 hover:text-black transition"
         >
           Edit
         </button>

         <button
           onClick={handleDelete}
           disabled={loading}
           className="text-sm text-red-500 hover:text-red-600 transition"
         >
           {loading ? "Deleting..." : "Delete"}
         </button>
       </div>
     </div>
   </article>
 );
}

export default PostCard;
