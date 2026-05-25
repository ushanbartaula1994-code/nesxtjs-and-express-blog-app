import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostsById,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

// CREATE
router.post("/", verifyJWT, createPost);

// READ ALL
router.get("/", getAllPosts);

// READ SINGLE 
router.get("/:id", getPostsById);

// UPDATE
router.patch("/:id", verifyJWT, updatePost);

// DELETE
router.delete("/:id", verifyJWT, deletePost);

export default router;
