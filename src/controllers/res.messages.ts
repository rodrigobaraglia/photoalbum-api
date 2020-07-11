import { Document } from "mongoose";
import { PHOTO_SAVED, SHOWING_PHOTOS } from "./constants";

const message = (message: string) => (data: any) => ({ message, ...data });

export const confirmPhotoSaved = message(PHOTO_SAVED);
export const confirmShowingPhotos = message(SHOWING_PHOTOS);