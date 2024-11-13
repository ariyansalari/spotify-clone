import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumsRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";
dotenv.config();

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(clerkMiddleware());
app.use(
  fileupload({
    useTempFiles: true,
    tempFilerDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10mb max files size
    },
  })
);

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statsRoutes);

app.use(( err, req, res, next )=>{
  res.status(500).json({message:process.env.NODE_ENVV==='production' ? 'Internal server error':err.message})
});

app.listen(PORT || 5000, () => {
  console.log("Server is runnig on port " + PORT);
  connectDB();
});


// ANCHOR Socket io 