import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image:{
      type:String,//links from cloudinary
      default:""

    }
  },
  { timestamps: true },
);

export const Post = mongoose.model("Post", postSchema);
