import { Schema, model } from "mongoose";
import { IPhoto } from "./declarations";
import { Request } from "express";
import { validateProps, validateDocument } from "../validation";
import { parseBody, getFilePath } from "../services/body.handler";
import {IStruct} from "../utils"

export const photoSchema = new Schema({
  title: String,
  description: String,
  path: String,
});

export const Model = model<IPhoto>("Photo", photoSchema);

const photoMetadata = parseBody("title", "description");

const photoPropsCheck = validateProps("title", "description", "path");

function extractPhotoData(data: Request) {
  return { ...photoMetadata(data), ...getFilePath(data) };
}

export function createPhoto(data: Request): IPhoto {
  return new Model(extractPhotoData(data));
}

export function factory(data: Request): IStruct<IPhoto> | void {
  return validateDocument(photoPropsCheck(createPhoto(data)));
}

