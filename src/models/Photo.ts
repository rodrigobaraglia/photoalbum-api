import { Schema, model, Model, Document } from "mongoose";
import { IPhoto } from "./declarations";
import { Request } from "express";

const photoSchema = new Schema({
  title: String,
  description: String,
  path: String,
});

export const Photo = model<IPhoto>("Photo", photoSchema);

export function createPhoto(data: Request): IPhoto {
  const {
    body: { title, description },
    file: { path },
  } = data;

  const photo = new Photo({
    title,
    description,
    path: path,
  });

  return photo;
}
