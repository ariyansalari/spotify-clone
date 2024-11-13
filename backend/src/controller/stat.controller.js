import { albumModel } from "../models/album.model.js";
import { songModel } from "../models/song.model.js";
import { UserModel } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  // const totalSongs = await songModel.countDocuments();
  // const totalUsers = await UserModel.countDocuments();
  // const totalAlbums = await albumModel.countDocuments();
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        songModel.countDocuments(),
        albumModel.countDocuments(),
        UserModel.countDocuments(),
        songModel.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalArtists: uniqueArtists[0]?.count || 0,
    });
  } catch (err) {
    next(err);
  }
};
