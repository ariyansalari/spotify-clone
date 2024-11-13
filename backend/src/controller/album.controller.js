import { albumModel } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await albumModel.find({});

    res.status(200).json(albums);
  } catch (err) {
    next(err);
  }
};

export const getSingleAlbum = async (req, res, next) => {
  try {
    const { albumId } = req.params;
    const album = await albumModel.findById(albumId).populate("songs");
    if (!album) {
      res.status(404).json({ message: "Album not found" });
    }
    res.status(200).json(album);
  } catch (err) {
    next(err);
  }
};
