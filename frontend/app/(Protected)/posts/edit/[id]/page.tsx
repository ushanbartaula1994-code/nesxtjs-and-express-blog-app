"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import API from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditPostPage() {
  console.log("EDIT PAGE LOADED");

  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // FETCH POST
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/api/v1/posts/${id}`);
        const post = res.data.data;

        setTitle(post.title);
        setContent(post.content);
        setImage(post.image || "");
      } catch (err) {
        console.log("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id]);

  // UPDATE POST
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await API.patch(`/api/v1/posts/${id}`, {
        title,
        content,
        image,
      });

      console.log("UPDATED:", { title, content, image });

      router.replace("/posts");
      router.refresh();
    } catch (err) {
      console.log("Update failed", err);
      alert("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Loading post...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Post</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleUpdate} className="space-y-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />

            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              required
            />

            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Image URL"
            />

            <Button type="submit" disabled={saving}>
              {saving ? "Updating..." : "Update Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
