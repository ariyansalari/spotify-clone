import express from "express";
import {
  checkAdmin,
  createAlbum,
  createSong,
  deleteAlbum,
  deleteSong,
} from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

// create song by admin
router.post("/songs",  createSong);

router.post("/albums", createAlbum);
router.post("/albums/:id", deleteAlbum);

// delete song by admin
router.delete("/songs/:id", deleteSong);
export default router;
