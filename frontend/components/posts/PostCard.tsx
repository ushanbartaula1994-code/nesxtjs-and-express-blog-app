"use client";

import Image from "next/image";
import type { Post } from "@/types/types";
import API from "@/lib/api";
import { usePosts } from "@/app/context/postContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <article
      className="
        group cursor-pointer
        rounded-[28px]
        border border-[#ebe5dd]
        bg-white/80
        overflow-hidden
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
      "
    >
     
      <div className="px-7 pt-7 md:px-10 md:pt-10">
        <h2 className="text-xl md:text-xl font-semibold tracking leading-tight text-slate-900">
          {post.title}
        </h2>
      </div>

     
      {post.image && (
        <div className="relative w-full h-72 mt-6 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      
      <div className="px-7 pt-6 md:px-10">
        <p className="text-[15px] md:text-[16px] leading-7 text-slate-600 line-clamp-3">
          {post.content}
        </p>
      </div>

      <div className="px-7 py-7 md:px-10 flex items-center justify-between gap-5">
       
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-orange-200 flex items-center justify-center text-sm font-semibold text-slate-700 uppercase">
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
            className="cursor-pointer px-4 py-2 rounded-full bg-slate-100 text-sm font-medium text-slate-700 hover:bg-slate-200 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="cursor-pointer px-4 py-2 rounded-full bg-red-50 text-sm font-medium text-red-500 hover:bg-red-100 transition"
          >
            {loading ? "..." : "Delete"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
