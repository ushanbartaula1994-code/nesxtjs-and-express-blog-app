import express from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/upload/image
router.post("/image", verifyJWT, upload.single("image"), uploadImage);

export default router;
