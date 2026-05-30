"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import type { Post } from "@/types/types";
import { responseCookiesToRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

interface EditPostFormProps {
  post: Post;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }
       console.log("Sending request to:", `/api/v1/posts/${post._id}`);

     const response= await API.patch(`/api/v1/posts/${post._id}`, formData);
     console.log("success",response.data)

      router.replace("/posts");
      router.refresh();
    } catch (error) {
      console.error("Update failed:", error);
     
      alert("Failed to update post");
    } finally {
      setSaving(false);
    }
  };

  return (
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

          <div className="space-y-2">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
            />

            {image && (
              <p className="text-sm text-muted-foreground">
                Selected: {image.name}
              </p>
            )}

            {!image && post.image && (
              <p className="text-sm text-muted-foreground">
                Current image will be kept if no new image is selected.
              </p>
            )}
          </div>

          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Updating..." : "Update Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
