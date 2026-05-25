import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // 1. Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 2. Check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // 3. Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // 4. Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  // 5. Remove password from response
  const loggedInUser = await User.findById(user._id).select("-password");

  // 6. Cookie config (IMPORTANT FOR VERCEL + RAILWAY)
  const cookieOptions = {
    httpOnly: true,
    secure: true, // HTTPS only (required in production)
    sameSite: "none", // cross-site cookies (Vercel ↔ Railway)
    path: "/",
    domain: ".railway.app", // IMPORTANT FIX
  };

  // 7. Set cookies
  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  // 8. Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: loggedInUser,
      },
      "User logged in successfully",
    ),
  );
});
