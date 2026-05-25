import API from "@/lib/api";

export const PostService = {
  async getAllPosts() {
    const res = await API.get("/api/v1/posts");
    return res.data.data;
  },

  async getPostById(id: string) {
    const res = await API.get(`/api/v1/posts/${id}`);
    return res.data.data;
  },
};
