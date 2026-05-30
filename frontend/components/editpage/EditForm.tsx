"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import API from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type{Post} from "@/types/types"

interface EditPostProps{
    post:Post
}

export default function EditPostProps({post}:EditPostProps){
    const router=useRouter()
      const [title, setTitle] = useState(post.title);
      const [content, setContent] = useState(post.content);
      const [image, setImage] = useState(post.image || "");
      const [saving, setSaving] = useState(false);
 const handleUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await API.patch(`/api/v1/posts/${post._id}`, {
        title,
        content,
        image,
      });

      router.replace("/posts");
      router.refresh();
    } catch (error) {
      console.error(error);
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
        <form
          onSubmit={handleUpdate}
          className="space-y-4"
        >
          <Input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Title"
            required
          />

          <Textarea
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            placeholder="Content"
            required
          />

          <Input
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            placeholder="Image URL"
          />

          <Button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


