"use client";

import { usePosts } from "@/app/context/postContext";
import PostCard from "@/components/posts/PostCard";

function PostsPage() {
  const { posts, isLoading } = usePosts();

  if (isLoading) {
    return (
      <div className="w-full relative min-h-screen bg-[#f9f6f2] top-20 px-4">
        <div className="text-slate-500 animate-pulse">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#f9f6f2] py-14 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Latest Posts
          </h1>
          <p className="text-slate-500 mt-2">
            Discover thoughts, stories, and ideas
          </p>
        </div>

        
        {posts.length === 0 ? (
          <div className="text-center text-slate-500 py-20">
            No posts available
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostsPage;
