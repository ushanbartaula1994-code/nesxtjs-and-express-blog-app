"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  postId: string;
};

export default function PostCardLink({ children, postId }: Props) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/posts/${postId}`)}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}
