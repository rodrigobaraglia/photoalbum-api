import { Document } from "mongoose";
import { strings } from "../assets";


function message(message: string) {
  return function <D extends Document>(data: D) {
    return { message, ...data };
  };
}

export const confirmPhotoSaved = message(strings.PHOTO_SAVED);
export const confirmShowingPhotos = message(strings.SHOWING_PHOTOS);
export const confirmUserSaved = message(strings.USER_SAVED);
export const confirmShowingUser = message(strings.SHOWING_USERS);


