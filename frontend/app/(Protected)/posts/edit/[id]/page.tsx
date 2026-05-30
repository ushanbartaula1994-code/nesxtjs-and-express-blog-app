import EditForm from "@/components/editpage/EditForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await res.json();
  const post = data.data;

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <EditForm post={post} />
    </div>
  );
}
