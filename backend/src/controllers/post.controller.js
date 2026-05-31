import { Post } from "../models/post.model.js";
import cloudinary from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";


//   CREATE POST

export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body || {};
  console.log("FILE RECEIVED:", req.file);

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  let imageUrl = null;

  if (req.file?.buffer) {
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "blog-images",
    });
    console.log("CLOUDINARY RESULT:", result);

    imageUrl = result.secure_url;
  }

  const post = await Post.create({
    title,
    content,
    image: imageUrl,
    author: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post created successfully"));
});

   //GET ALL POSTS

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .populate("author", "username email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});


   //GET SINGLE POST

export const getPostsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid post id");
  }

  const post = await Post.findById(id).populate("author", "username email");

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post fetched successfully"));
});


   //UPDATE POST 

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

 console.log("USER:", req.user);
 console.log("ID:", req.params.id);

  // 1. Validating ID (prevents Mongo crash)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid post id");
  }

  // 2. Safe auth check 
  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  // 3. Safe ownership check 
  if (!post.author) {
    throw new ApiError(500, "Post author missing");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to update this post");
  }

  const { title, content } = req.body || {};

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;

  // 4. Image update (safe check)
  if (req.file?.buffer) {
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "blog-images",
    });

    post.image = result.secure_url;
  }

  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post updated successfully"));
});


  // DELETE POST

export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid post id");
  }

  if (!req.user?._id) {
    throw new ApiError(401, "Unauthorized");
  }

  const post = await Post.findById(id);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Not allowed to delete this post");
  }

  await post.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Post deleted successfully"));
});
