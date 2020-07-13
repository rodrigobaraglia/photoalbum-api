import { Schema, model } from "mongoose";
import { IUser, IAlbum, IPhoto, IComment } from "./declarations";

import { Request } from "express";

const postSchema = new Schema();
postSchema.add({
  author: String,
  text: String,
  date: Date,
  comments: [postSchema],
});

const Comment = model<IComment>("Comment", postSchema);

export { postSchema, Comment };
