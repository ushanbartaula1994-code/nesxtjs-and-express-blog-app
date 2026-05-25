import cloudinary from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// upload image
export const uploadImage = asyncHandler(async (req, res) => {
  const file = req.file;

  if (!file) {
    throw new ApiError(400, "Image file is required");
  }

  // convert buffer → base64
  const base64 = file.buffer.toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64}`;

  // upload to cloudinary
  const result = await cloudinary.uploader.upload(dataURI, {
    folder: "blog-images",
  });

  if (!result) {
    throw new ApiError(500, "Image upload failed");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        url: result.secure_url,
        public_id: result.public_id,
      },
      "Image uploaded successfully",
    ),
  );
});
