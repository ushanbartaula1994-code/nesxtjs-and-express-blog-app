"use client";

import { usePosts } from "@/app/context/postContext";
import PostCard from "@/components/posts/PostCard";

function PostsPage() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500">No posts available</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default PostsPage;
