import { Document } from "mongoose";
import { strings } from "../assets";

function message(message: string) {
  return function <D extends Document>(data: D) {
    return { message, ...data };
  };
}

export const confirmPhotoSaved = message(strings.PHOTO_SAVED);
export const confirmShowingPhotos = message(strings.SHOWING_PHOTOS);
