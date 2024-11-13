import { songModel } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await songModel.find().sort({ createdAt: -1 });

    res.json(songs);
  } catch (err) {
    next(err);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // 6 random songs using mongo db aggregation pipline
    const songs = await songModel.aggregate([
      {
        $sample: {
          size: 6,
        },
      },
      {
        $project: {
          id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          autdioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (err) {
    next(err);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        // 4 random songs using mongo db aggregation pipline
        const songs = await songModel.aggregate([
          {
            $sample: {
              size: 4,
            },
          },
          {
            $project: {
              id: 1,
              title: 1,
              artist: 1,
              imageUrl: 1,
              autdioUrl: 1,
            },
          },
        ]);
    
        res.json(songs);
      } catch (err) {
        next(err);
      }
  };

export const getTrendingSongs = async (req, res, next) => {
    try {
        // 6 random songs using mongo db aggregation pipline
        const songs = await songModel.aggregate([
          {
            $sample: {
              size: 4,
            },
          },
          {
            $project: {
              id: 1,
              title: 1,
              artist: 1,
              imageUrl: 1,
              autdioUrl: 1,
            },
          },
        ]);
    
        res.json(songs);
      } catch (err) {
        next(err);
      }
};


