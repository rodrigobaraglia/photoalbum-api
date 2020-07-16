import { HTTPHandler as http, IRequestHandler } from "../services";
import { confirmPhotoSaved, confirmShowingPhotos } from "../messages";
import {photo}  from "../models";


export const createPhotoHandler: IRequestHandler = http.post(
  photo.factory,
  confirmPhotoSaved
);

export const getPhotosHandler: IRequestHandler = http.get(
  photo.Model,
  confirmShowingPhotos
);
