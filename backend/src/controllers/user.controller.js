import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import { registerSchema } from "../validations/Auth.validation.js";
import { loginSchema } from "../validations/Login.validation.js";
import { formatZodErrors } from "../utils/ZodError.js";

// Register User
export const registerUser = asyncHandler(async (req, res) => {
  //  Zod validation
  const result = registerSchema.safeParse(req.body);

 if (!result.success) {
   const errors = formatZodErrors(result.error.issues);
   throw new ApiError(400, "Validation failed", errors);
 }

  const { username, email, password, fullname } = result.data;

  //  Check existing user
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  //  Create user
  const user = await User.create({
    username,
    email,
    password,
    fullname,
  });

  //  Remove password
  const createdUser = await User.findById(user._id).select("-password");

  // . Response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});
// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
  //zod validation
  const result = loginSchema.safeParse(req.body);
if (!result.success) {
  const errors = formatZodErrors(result.error.issues);
  throw new ApiError(400, "Validation failed", errors);
}

  const { email, password } = result.data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  const loggedInUser = user.toObject();
  delete loggedInUser.password;

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  res.cookie("accessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

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
