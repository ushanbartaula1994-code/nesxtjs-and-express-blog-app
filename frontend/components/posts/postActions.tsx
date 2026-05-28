"use client";

import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { useState } from "react";


export default function PostActions({ postId }: { postId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log("POST ID IN ACTIONS:", postId, typeof postId);

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      setLoading(true);
      await API.delete(`/api/v1/posts/${postId}`);
      router.refresh()// refresh UI
    } catch (err) {
        console.log(err)
      alert("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => router.push(`/posts/edit/${postId}`)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        Edit
      </button>

      <button
        onClick={handleDelete}
        disabled={loading}
        className="px-3 py-1 bg-red-200 rounded disabled:opacity-50"
      >
        {loading ? "..." : "Delete"}
      </button>
    </div>
  );
}
