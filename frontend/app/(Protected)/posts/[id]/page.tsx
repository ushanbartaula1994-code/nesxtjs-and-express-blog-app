import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/types/types";

type Props = {
  params: {
    id: string;
  };
};

export default async function SinglePostPage({ params }: Props) {
  const { id } =  params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${id}`,
    {
      cache: "no-store",
      credentials: "include",
    },
  );

  if (!res.ok) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Post not found
      </div>
    );
  }

  const data = await res.json();
  const post: Post = data.data;

  return (
    <div className="w-full min-h-screen bg-slate-50 flex justify-center p-6">
      <Card className="w-full max-w-3xl bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl">{post.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {post.image && (
            <Image
              src={post.image}
              alt={post.title}
              width={900}
              height={500}
              priority
              className="w-full rounded-lg object-cover"
            />
          )}

          <p className="text-slate-700 leading-relaxed text-base">
            {post.content}
          </p>

          <div className="pt-4 border-t text-sm text-slate-500 flex justify-between">
            <span>Author: {post.author?.username}</span>

            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import API from "@/lib/api";
// import Image from "next/image";
// import type { Post } from "@/types/types";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// function SinglePostPage() {
//   const params = useParams();
//   const id = params.id as string;

//   const [post, setPost] = useState<Post | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await API.get(`/api/v1/posts/${id}`);
//         setPost(res.data.data);
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchPost();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center">
//         Loading post...
//       </div>
//     );
//   }

//   if (!post) {
//     return (
//       <div className="w-full min-h-screen flex items-center justify-center">
//         Post not found
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-slate-50 flex justify-center p-6">
//       <Card className="w-full max-w-3xl bg-white shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-3xl">{post.title}</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {post.image && (
//             <Image
//               src={post.image}
//               alt={post.title}
//               width={900}
//               height={500}
//               className="w-full rounded-lg object-cover"
//             />
//           )}

//           <p className="text-slate-700 leading-relaxed text-base">
//             {post.content}
//           </p>

//           <div className="pt-4 border-t text-sm text-slate-500 flex justify-between">
//             <span>Author: {post.author?.username}</span>
//             <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default SinglePostPage;
