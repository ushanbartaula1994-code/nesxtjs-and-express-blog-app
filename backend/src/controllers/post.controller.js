import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// CREATE POST

export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const post = await Post.create({
    title,
    content,
  image: req.file ? `/uploads/${req.file.filename}` : null, // multer file handling
    author: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});
// GET ALL POSTS
export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "username email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});
// GET SINGLE POST
export const getPostsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate("author", "username email")

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"))
})

// UPDATE POST
export const updatePost = asyncHandler(async (req, res) => {
  console.log("REQ FILE:", req.file);
  const { id } = req.params;
  const { title, content } = req.body;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to perform this action");
  }

  // update fields safely
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;

  // multer file handling
 if (req.file) {
   post.image = `/uploads/${req.file.filename}`;
 }

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});

// DELETE POST
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this post");
  }

  await post.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});
