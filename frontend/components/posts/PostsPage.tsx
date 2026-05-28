"use client";

import { usePosts } from "@/app/context/postContext";
import PostCard from "@/components/posts/PostCard";

export default function PostsPage() {
  const { posts, isLoading } = usePosts();

  const firstPost = posts?.length ? posts[0] : null;
  const remainingPosts = posts?.length ? posts.slice(1) : [];

  return (
    <div className="w-full min-h-screen bg-[#f9f6f2] py-14 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="text-center mb-10 pt-20 min-h-30">
          {isLoading ? (
            <>
              <div className="h-10 w-48 mx-auto bg-slate-200 animate-pulse rounded" />
              <div className="h-4 w-64 mx-auto mt-3 bg-slate-200 animate-pulse rounded" />
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Latest Posts
              </h1>
              <p className="text-slate-500 mt-2">
                Discover thoughts, stories, and ideas
              </p>
            </>
          )}
        </div>

        
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-slate-200 animate-pulse rounded-xl"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-slate-500 py-20 min-h-30">
            No posts available
          </div>
        ) : (
          <div className="space-y-6">
            {firstPost && <PostCard post={firstPost} />}

            {remainingPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
