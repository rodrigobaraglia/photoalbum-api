import { Schema, model } from "mongoose";
import { IAlbum } from "./declarations";
import {photoSchema} from "./Photo";

export const albumSchema = new Schema({
  user: String,
  photos: [photoSchema],
});
export const Album = model<IAlbum>("Album", albumSchema);
