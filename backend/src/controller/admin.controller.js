import { albumModel } from "../models/album.model.js";
import { songModel } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";
import { json } from "express";

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (err) {
    console.log("Error in upload to cloundinary", err);
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new songModel({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    if (albumId) {
      await albumModel.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }
    res.status(201).json(song);
  } catch (err) {
    console.log("Error in createSong", error);
    next(err);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;

    const song = await songModel.findById(id);

    if (song.albumId) {
      await albumModel.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }
    await songModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Song deleted succesfully" });
  } catch (err) {
    console.log("Error in delete song", error);
    next(err);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new albumModel({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();

    res.status(200), json(album);
  } catch (err) {
    console.log("Error in create album", error);
    next(err);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await songModel.deleteMany({ albumId: id });
    await albumModel.findByIdAndDelete(id);

    res.status(200).json({ message: "album deleted succesfully" });
  } catch (err) {
    console.log("Error in delete song", error);
    next(err);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
