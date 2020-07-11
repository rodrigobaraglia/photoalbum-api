import { Router, Request, Response } from "express";
import { TEST, PHOTOS, PHOTO_BY_ID } from "./constants";
import { handleTestRoute } from "../controllers";
import multer from "../libs/multer";
import {
  createPhotoHandler,
  getPhotosHandler,
} from "../controllers/specific/photo.controller";

const router = Router();

router.route(TEST).get(handleTestRoute);
router
  .route(PHOTOS)
  .get(getPhotosHandler)
  .post(multer.single("image"), createPhotoHandler);
router.route(PHOTO_BY_ID).get(getPhotosHandler)

export default router;
