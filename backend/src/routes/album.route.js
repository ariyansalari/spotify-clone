import express from "express";
import { getAllAlbums, getSingleAlbum } from "../controller/album.controller.js";

const router = express.Router();

router.get("/", getAllAlbums);

router.get("/:albumId", getSingleAlbum);


export default router;
