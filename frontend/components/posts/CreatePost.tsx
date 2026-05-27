"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { usePosts } from "@/app/context/postContext";

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
  const { refreshPosts } = usePosts();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await API.post("/api/v1/posts", {
        title,
        content,
        image: image || undefined,
      });

      await refreshPosts();

      setTitle("");
      setContent("");
      setImage("");

      router.push("/posts");
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
            {/* Title */}
            <Input
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Content */}
            <Textarea
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-37.5"
            />

           
            <Input
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            
            {error && (
              <p className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
                {error}
              </p>
            )}
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="cursior-pointer"
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default CreatePost;
