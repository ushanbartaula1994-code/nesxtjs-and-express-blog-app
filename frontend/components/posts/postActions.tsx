"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostActions({ postId }: { postId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log("DELETE ID:", postId);

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      router.refresh();
    } catch (err) {
      console.log(err);
      alert("Failed to delete post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => router.push(`/posts/edit/${postId}`)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
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
