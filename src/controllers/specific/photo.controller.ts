import {RequestHandler} from "../generic/declarations";
import { postHandler, getHandler } from "../generic/quialifiedHandlers";
import { message } from "../../services";
import { Photo, createPhoto } from "../../models/Photo";


export const createPhotoHandler: RequestHandler = postHandler(
  createPhoto,
  message.confirmPhotoSaved
);

export const getPhotosHandler: RequestHandler = getHandler(Photo, message.confirmShowingPhotos);

