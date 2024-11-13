import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  
  },
  { timestamps: true }
);

export const messageModel = mongoose.model("message", messageSchema);
