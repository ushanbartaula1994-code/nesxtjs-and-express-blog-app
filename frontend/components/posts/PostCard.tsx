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
    <div className="group bg-white/70 backdrop-blur-xl border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
     
      {post.image && (
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        </div>
      )}

     
      <div className="p-5 space-y-3">
     
        <h2 className="text-lg md:text-xl font-semibold text-slate-800 leading-snug">
          {post.title}
        </h2>

       
        <p className="text-sm text-slate-600 line-clamp-3">{post.content}</p>

        <div className="flex items-center justify-between pt-4">
         
          <div className="text-xs text-slate-500">
            <p className="font-medium text-slate-700">
              {post.author?.username}
            </p>
            <p>{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>

          
          <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="rounded-full"
            >
              Edit
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={loading}
              className="rounded-full"
            >
              {loading ? "..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
