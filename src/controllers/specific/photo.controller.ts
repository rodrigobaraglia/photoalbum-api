import { postHandler, getHandler } from "../generic/quialifiedHandlers";
import { message } from "../../services";
import { Photo, createPhoto } from "../../models/Photo";

export const createPhotoHandler = postHandler(
  createPhoto,
  message.confirmPhotoSaved
);

export const getPhotosHandler = getHandler(Photo, message.confirmShowingPhotos);
