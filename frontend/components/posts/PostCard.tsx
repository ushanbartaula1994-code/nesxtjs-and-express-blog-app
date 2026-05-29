import Image from "next/image";
import PostActions from "@/components/posts/postActions";
import type { Post } from "@/types/types";
import Link from "next/link";
type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  return (
    
     <article className="rounded-xl bg-white p-4 border cursor-pointer">
    <Link href={`/posts/${post._id}`}>
      <div className="cursor-pointer transition hover:scale-[1.01] hover:shadow-lg">
        <h2>{post.title}</h2>

        {post.image && (
          <Image src={post.image} alt={post.title} width={600} height={300} />
        )}

        <p>{post.content}</p>
        </div>
        </Link>
        <PostActions postId={post._id} />
      </article>
    
  );
}
