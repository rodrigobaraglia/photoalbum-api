import { Schema, model } from "mongoose";
import { IPhoto, IAlbum, IComment, IUser } from "./declarations";
import { Request } from "express";
import { validateProps, Validated } from "../validation";
import { parseForm } from "../services";
import { ForeignData as Data } from "../utils";
import { documentFactory } from "./documentFactory";
import {IStruct} from "../utils";

export const photoSchema = new Schema({
  title: String,
  description: String,
  path: String,
});

export const Model = model<IPhoto>("Photo", photoSchema);

const propKeys = {
  pathAlias: "path",
  other: ["title", "description"],
};

const photoPropsCheck: <T>(item: T) => Validated<T> = validateProps(
  propKeys.pathAlias,
  ...propKeys.other
);

const extractPhotoData: (req: Request) => Data = parseForm(
  propKeys.pathAlias,
  ...propKeys.other
);

function createPhoto(data: Data) {
  return new Model(data);
}

type Factory<T> = (data: Request) => void | IStruct<T>

export const factory = documentFactory(
  extractPhotoData,
  createPhoto,
  photoPropsCheck
);




