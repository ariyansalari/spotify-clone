import mongoose from "mongoose";

const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  releaseYear:{
    type:Number,
    required:true
  },
  songs:[{type:mongoose.Schema.Types.ObjectId,ref:"Song"}]
  },
  { timestamps: true }
);

export const albumModel = mongoose.model("album", albumSchema);
