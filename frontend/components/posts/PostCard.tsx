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
  <article className="rounded-[32px] border border-[#ebe5dd] bg-white/80 overflow-hidden transition hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)]">

    {/* IMAGE */}
    {post.image && (
      <div className="relative w-full h-80 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
      </div>
    )}
    <div className="p-8 md:p-10">

     
      <div className="flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-200 to-orange-200 flex items-center justify-center text-sm font-semibold text-slate-700 uppercase">
            {post.author?.username?.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-medium text-slate-800">
              {post.author?.username}
            </p>

            <p className="text-xs text-slate-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        
        <div className="flex items-center gap-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 rounded-full bg-slate-100 text-sm text-slate-700 hover:bg-slate-200 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 rounded-full bg-red-50 text-sm text-red-500 hover:bg-red-100 transition"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      <h2 className="mt-8 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
        {post.title}
      </h2>

      <p className="mt-5 text-[17px] leading-8 text-slate-600 line-clamp-3">
        {post.content}
      </p>

    </div>
  </article>
);
}

export default PostCard;
