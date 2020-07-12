import { postHandler, getHandler, IRequestHandler } from "../generic";
import { message } from "../../services";
import {photo}  from "../../models";

export const createPhotoHandler: IRequestHandler = postHandler(
  photo.createPhoto,
  message.confirmPhotoSaved
);

export const getPhotosHandler: IRequestHandler = getHandler(
  photo.Photo,
  message.confirmShowingPhotos
);
