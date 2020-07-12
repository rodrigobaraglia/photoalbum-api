import {IRequestHandler} from "../generic/declarations";
import { postHandler, getHandler } from "../generic/quialifiedHandlers";
import { message } from "../../services";
import { Photo, createPhoto } from "../../models/Photo";


export const createPhotoHandler: IRequestHandler = postHandler(
  createPhoto,
  message.confirmPhotoSaved
);

export const getPhotosHandler: IRequestHandler = getHandler(Photo, message.confirmShowingPhotos);

