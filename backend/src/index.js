import dotenv from "dotenv";
dotenv.config();

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
