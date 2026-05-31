import { configureCloudinary } from "./config/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();
configureCloudinary();

console.log("CORS:", process.env.CORS_ORIGIN);

import connectDB from "./db/index.js";
import app from "./app.js";

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch(console.log);
  console.log("CLOUDINARY ENV CHECK:", {
    cloud: process.env.CLOUDINARY_CLOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET?.slice(-4),
  });
