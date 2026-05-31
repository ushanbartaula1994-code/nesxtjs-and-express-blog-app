"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

function CreatePost() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
 const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    await API.post("/api/v1/posts", formData);

    setTitle("");
    setContent("");
    setImage(null);

    router.push("/posts");
    router.refresh();
  } catch (err) {
    console.log(err);
    setError("Failed to create post");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full min-h-screen bg-[#f9f6f2] flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-xl shadow-sm rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create New Post
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Textarea
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-37.5"
            />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setImage(file);
              }}
            />

            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                {error}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default CreatePost;
