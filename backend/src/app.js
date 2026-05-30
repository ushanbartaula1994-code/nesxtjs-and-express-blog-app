import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

// 1. CORS 
app.use(
  cors({
    origin: "https://nesxtjs-and-express-blog-app.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);




// 3. Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/uploads", express.static("uploads"));
// 4. Cookies
app.use(cookieParser());

// 5. Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/upload", uploadRoutes);


app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
