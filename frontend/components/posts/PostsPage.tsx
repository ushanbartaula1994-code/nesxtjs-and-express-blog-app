import PostCard from "@/components/posts/PostCard";
import type{Post} from "@/types/types"

export default async function PostsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`, {
    cache: "force-cache",
    next: { revalidate: 60 },
  });

  const posts:Post[] = await res.json();

  const firstPost = posts?.length ? posts[0] : null;
  const remainingPosts = posts?.length ? posts.slice(1) : [];

  return (
    <div className="w-full min-h-screen bg-[#f9f6f2] py-14 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-10 pt-20 min-h-30">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Latest Posts
          </h1>
          <p className="text-slate-500 mt-2">
            Discover thoughts, stories, and ideas
          </p>
        </div>

        <div className="space-y-6">
          {firstPost && <PostCard post={firstPost} />}

          {remainingPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
