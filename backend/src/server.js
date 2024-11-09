import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumsRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumsRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT || 5000, () => {
  console.log("Server is runnig on port " + PORT);
  connectDB();
});