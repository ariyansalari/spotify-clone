import express from "express";
import { getAllUsers } from "../controller/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getAllUsers);

//ANCHOR get all messages



export default router;
