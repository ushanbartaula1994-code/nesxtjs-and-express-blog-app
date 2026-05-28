import Image from "next/image";
import dynamic from "next/dynamic";
import type { Post } from "@/types/types";

const PostActions = dynamic(() => import("@/components/posts/postActions"), {
  ssr: false,
});

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  console.log("POST CARD ID:", post._id, typeof post._id);

  return (
    <article className="rounded-xl bg-white p-4 border">
      <h2>{post.title}</h2>

      {post.image && (
        <Image src={post.image} alt={post.title} width={600} height={300} />
      )}

      <p>{post.content}</p>

      <PostActions postId={post._id} />
    </article>
  );
}
