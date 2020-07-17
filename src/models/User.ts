import { Schema, model } from "mongoose";
import { IUser } from "./declarations";
import { parseForm } from "../services";
import { photoSchema } from "./Photo";
import { postSchema } from "./Post";
import { Request } from "express";
import { validateProps, Validated } from "../validation";
import { documentFactory } from "./documentFactory";
import { ForeignData as Data } from "../utils";

const userSchema = new Schema({
  name: String,
  age: Number,
  password: String,
  album: [photoSchema],
  posts: [postSchema],
  avatar_path: String,
});

export const Model = model<IUser>("User", userSchema);

const propKeys = {
  pathAlias: "avatar_path",
  other: ["name", "age", "password"],
};

const userPropsCheck: <T>(item: T) => Validated<T> = validateProps(
  propKeys.pathAlias,
  ...propKeys.other
);

const extractUserData: (req: Request) => Data = parseForm(
  propKeys.pathAlias,
  ...propKeys.other
);

function createUser(data: Data) {
  return new Model(data);
}

export const factory = documentFactory(
  extractUserData,
  createUser,
  userPropsCheck
);
