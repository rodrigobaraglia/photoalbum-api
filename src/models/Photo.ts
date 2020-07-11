import { Schema, model } from "mongoose";
import { IPhoto } from "./declarations";
import { Request } from "express";

const photoSchema = new Schema({
  title: String,
  description: String,
  path: String,
});

export const Photo = model<IPhoto>("Photo", photoSchema);


export function createPhoto(data: Request): IPhoto {
  const { title, description } = data.body;
  const { path } = data.file;

  const photo = new Photo({
    title,
    description,
    path: path,
  });

  return photo;
};

export async function getPhoto(data: any = {}): Promise<IPhoto | Array<IPhoto>> {
  const payload = await Photo.find(data)
  console.log(payload)
  return payload
}

