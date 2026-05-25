"use client";

import Image from "next/image";
import type { Post } from "@/types/types";
import API from "@/lib/api";
import { usePosts } from "@/app/context/postContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  const { refreshPosts } = usePosts();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const ok = confirm("Do you want to delete this post?");
    if (!ok) return;

    try {
      setLoading(true);

      await API.delete(`/api/v1/posts/${post._id}`);

      await refreshPosts();
    } catch (err) {
      console.log("Delete failed:", err);
      alert("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    router.push(`/posts/edit/${post._id}`);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
      {/* Title */}
      <CardHeader>
        <CardTitle className="text-xl">{post.title}</CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent>
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-52 object-cover rounded-lg"
          />
        )}

        <p className="text-sm text-slate-600 mt-3 line-clamp-3">
          {post.content}
        </p>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between items-center text-xs text-slate-500">
        <div className="flex flex-col">
          <span className="font-medium">{post.author?.username}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* Edit */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleEdit}
            type="button"
            className="cursor-pointer"
          >
            Edit
          </Button>

          {/* Delete */}
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            type="button"
            className="cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default PostCard;
