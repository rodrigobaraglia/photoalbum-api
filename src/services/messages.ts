import { Document } from "mongoose";
import { PHOTO_SAVED, SHOWING_PHOTOS } from "./constants";

function message(message: string) {
  return function <D extends Document>(data: D) {
    return { message, ...data };
  };
}

export const confirmPhotoSaved = message(PHOTO_SAVED);
export const confirmShowingPhotos = message(SHOWING_PHOTOS);
