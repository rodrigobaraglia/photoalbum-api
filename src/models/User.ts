import { Schema, model } from "mongoose";
import { IUser, IAlbum, IPhoto, IComment } from "./declarations";
import { photoSchema } from "./Photo";
import { postSchema } from "./Post";
import { Request } from "express";

const userSchema = new Schema({
  name: String,
  album: [photoSchema],
  posts: [postSchema],
});

export const User = model<IUser>("User", userSchema);

export function createUser(data: Request): IUser {
  const { name } = data.body;

  const user = new User({
    name,
  });

  return user;
}
